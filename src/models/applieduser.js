import mongoose from "mongoose"

const appliedUserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    investmentRange: { 
      type: String, 
      required: true, 
      enum: ['3 to 5', '5 to 10', 'above 10'] 
    },
    franchiseType: { 
      type: String, 
      required: true, 
      enum: ['dealership', 'distributorship', 'super stockiest'] 
    },
    referenceNumber: { type: String, unique: true },
    status: { 
      type: String, 
      enum: ['approved', 'pending'], 
      default: 'pending' 
    },
    createdAt: { type: Date, default: Date.now }
  });
  
const AppliedUser = mongoose.model("AppliedUser", appliedUserSchema);

export default AppliedUser;
