import jwt from "jsonwebtoken";
import UserData from "../models/userdata.js";
import Admin from "../models/admin.js";
// Middleware to protect routes
// User
export const protect = async (req, res, next) => {
    const token = req.cookies?.token;

    console.log("token in authmiddleware:", token); // Debug

    if (!token) {
        return res
            .status(401)
            .json({ message: "Access Denied. No Token Provided!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let user = await UserData.findOne({ email: decoded.email.toLowerCase() });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found. Invalid token." });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res
            .status(403)
            .json({ message: "Token is invalid or expired." });
    }
};

// Admin
export const adminProtect = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res
            .status(401)
            .json({ message: "Access Denied. No Token Provided!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch admin from database using decoded ID
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        // Attach admin data to req.user
        req.user = { id: admin._id, role: admin.role };

        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res
            .status(403)
            .json({ message: "Token is invalid or expired." });
    }
};

// Role-based authorization middleware
export const authorizeRoles =
    (...roles) =>
    (req, res, next) => {
        if (!req?.user?.role) {
            return res.status(403).json({
                message: "Access denied. No role assigned to the user.",
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access denied. Required roles: ${roles.join(", ")}`,
            });
        }
        next();
    };
