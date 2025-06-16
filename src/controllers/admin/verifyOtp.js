import { otpStore } from "../../utils/otpStore.js";

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }



    try {
        // Retrieve the OTP record for the email
        const record = otpStore.get(email);

        // Log the current OTP store for debugging
        console.log("Current OTP store:", Array.from(otpStore.entries()));

        if (!record) {
            console.log("No OTP found for this email.");
            return res.status(400).json({ message: "Invalid OTP or email" });
        }

        const { otpCode, otpExpiry } = record;

        // Check if the OTP matches
        if (otpCode !== otp) {
            console.log("Incorrect OTP provided.");
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Check if the OTP has expired
        if (otpExpiry < Date.now()) {
            otpStore.delete(email); // Remove expired OTP immediately
            console.log("OTP has expired.");
            return res.status(400).json({ message: "OTP has expired" });
        }

        otpStore.delete(email); // Remove OTP after successful verification
        console.log("OTP verified successfully.");

  
        return res.status(200).json({ message: "OTP verified successfully" });


    } catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

