import Admin from "../../models/admin.js";
import { otpStore } from "../../utils/otpStore.js";
import jwt from "jsonwebtoken"
export const login = async (req, res) => {
    try {
        const { email, otp } = req.body;


        const user = await Admin.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (!email || !otp) {
            return res
                .status(400)
                .json({ message: "Email and OTP are required" });
        }

        const record = otpStore.get(email);
        console.log(record)
        if (!record) {
            return res.status(400).json({ message: "Invalid OTP or email" });
        }

        const { otpCode, otpExpiry } = record;
        if (otpCode !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (otpExpiry < Date.now()) {
            otpStore.delete(email);
            return res.status(400).json({ message: "OTP has expired" });
        }

        otpStore.delete(email);



        // Generate Token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res
            .cookie("token", token, {
                secure: true,
                httpOnly: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 48,
            })
            .status(200)
            .json({ message: "Logged in successfully", user });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .json({ message: "You're now logged out." });
};

export const checkAuth = (req, res) => {
    const authToken = req.cookies.token;
    if (authToken) {
        res.status(200).json({ isAuthenticated: true, user: req.user });
    } else {
        res.status(200).json({ isAuthenticated: false, user: null });
    }
};
