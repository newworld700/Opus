// Updated Admin model
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
 
    phone: {
        type: Number,
    }, 

    email: {
        type: String,
        required: true,
        unique: true,
    },

    role: {
        type: String,
        enum: ["admin", "superadmin"],
        default: "admin",
    },

    verified: { type: Boolean },

    created_at: {
        type: Date,
        default: Date.now,
    },

    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Admin = mongoose.model("Admin", userSchema);

export default Admin;
