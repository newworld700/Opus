// User LOgin

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserData from "../../models/userdata.js";
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required." });
        }

        // Find the user by email
        const user = await UserData.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Verify the password
     
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

      
        return res
            .cookie("token", token, {
                secure: true,
                httpOnly: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 48,
                // user: {
                //   id: user._id,
                //   username: user.username,
                //   email: user.email,
                //   role: user.role,
                // },
            })
            .status(200)
            .json({ message: "Logged in.", user });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error." });
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
