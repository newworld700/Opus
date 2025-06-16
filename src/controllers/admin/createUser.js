import UserData from '../../models/userdata.js';
import bcrypt from 'bcrypt';
import path from 'path';

export const registerUser = async (req, res) => {
  try {
    // Extract text data from form
    const userData = {
      ...req.body,
      // Handle file paths if they exist
      photo: req.files['photo'] ? `/uploads/${req.files['photo'][0].filename}` : null,
    };

    // Handle documents if they exist
    if (req.files['documents']) {
      userData.documents = req.files['documents'].map(file => ({
        name: file.originalname,
        url: `/uploads/${file.filename}`,
        type: file.mimetype.startsWith('image') ? 'image' : 'pdf'
      }));
    }

    // Check if referenceNumber exists
    if (userData.referenceNumber) {
      const existingUser = await UserData.findOne({ referenceNumber: userData.referenceNumber });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Reference number already exists'
        });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    // Create new user
    const newUser = new UserData(userData);
    const savedUser = await newUser.save();

    // Remove password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    return res.status(200).json({
      success: true,
      data: userResponse,
      message: 'User registered successfully'
    });
    
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    // Handle duplicate regId error
    if (error.code === 11000 && error.keyPattern?.referenceNumber) {
      return res.status(400).json({
        success: false,
        message: 'Reference number already exists'
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: `Validation error: ${errors.join(', ')}`
      });
    }
    
    // Handle other errors
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};