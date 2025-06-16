import Admin from "../../models/admin.js";
import { otpStore } from "../../utils/otpStore.js";

export const registerAdmin = async (req, res) => {
    const { email, otp } = req.body;


    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required." });
    }

    // Retrieve OTP from store
    const record = otpStore.get(email);

    if (!record) {
        return res.status(400).json({ message: "Invalid OTP or email." });
    }

    const { otpCode, otpExpiry } = record;

    // Check if OTP is correct
    if (otpCode !== otp) {
        return res.status(400).json({ message: "Invalid OTP." });
    }

    // Check if OTP has expired
    if (otpExpiry < Date.now()) {
        otpStore.delete(email);
        return res.status(400).json({ message: "OTP has expired." });
    }

    // Remove OTP after successful verification
    otpStore.delete(email);

    try {
        // Check if user already exists
        const admin = await Admin.findOne({ email });
        if (admin && admin.role) {
            console.log(`Role: ${Admin.role}`);
        }


        if (await Admin.findOne({ email })) {
            return res.status(400).json({ message: "Admin already exists." });
        }


        // Create new admin user
        const newAdmin = new Admin({ email, role: "admin", verified: true });

        // Save the user in database
        await newAdmin.save();

        return res
            .status(201)
            .json({ message: "Admin registered successfully." });
    } catch (error) {
        console.error("Error registering admin:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
