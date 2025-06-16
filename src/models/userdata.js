import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: String,
  url: String,
  type: String, // 'image' or 'pdf'
  uploadedAt: { type: Date, default: Date.now }
});

const userDataSchema = new mongoose.Schema({
  referenceNumber: { type: String, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  photo: { type: String }, // Profile image URL
  regAmount: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' 
  },
  caste: { type: String },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  dob: { type: Date },
  fatherName: { type: String },
  address: { type: String },
  casteCategory: { type: String, enum: ['gen', 'obc', 'sc', 'st'] },
  storeAddress: { type: String },
  storeMap: { type: String },
  documents: [documentSchema], // Array of documents
  createdAt: { type: Date, default: Date.now }
});

const UserData = mongoose.model('UserData', userDataSchema);

export default UserData;