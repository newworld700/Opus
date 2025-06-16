import { newOtp } from "../../utils/otpmail.js";
import { otpStore } from "../../utils/otpStore.js";
import { sendOtp } from "../../utils/otpmail.js";
import Admin from "../../models/admin.js";

export const generateOtp = async (req,res) => {

    const { email } = req.body;
    if (!email) {
        throw new Error("Email address is required");
    }

    try {

        const otpCode = newOtp();
        const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

        otpStore.set(email, { otpCode, otpExpiry });

        console.log(`✅ OTP generated for ${email}: ${otpCode}`);
        console.log(`🔍 Current OTP Store:`, otpStore);

        await sendOtp(email, otpCode);
        return res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
