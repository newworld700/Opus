import UserData from "../../models/userdata.js";
import bcrypt from 'bcrypt';

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body }; // Clone request body

    // Remove documents field to prevent casting issues
    delete updateData.documents;

    // Check if user exists
    const existingUser = await UserData.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Handle file uploads if they exist
    if (req.files) {
      // Handle profile photo
      if (req.files['photo']) {
        updateData.photo = `/uploads/${req.files['photo'][0].filename}`;
      }

      // Handle documents - REPLACE existing array with new uploads
      if (req.files['documents']) {
        updateData.documents = req.files['documents'].map(file => ({
          name: file.originalname,
          url: `/uploads/${file.filename}`,
          type: file.mimetype.startsWith('image') ? 'image' : 'pdf'
        }));
      }
    }

    // Check for password update
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    // Check for duplicate referenceNumber
    if (updateData.referenceNumber && 
        updateData.referenceNumber !== existingUser.referenceNumber) {
      const refNumUser = await UserData.findOne({ 
        referenceNumber: updateData.referenceNumber 
      });
      
      if (refNumUser) {
        return res.status(400).json({
          success: false,
          message: 'Reference number already exists'
        });
      }
    }

    // Check for duplicate email
    if (updateData.email && updateData.email !== existingUser.email) {
      const emailUser = await UserData.findOne({ email: updateData.email });
      
      if (emailUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    // Update user
    const updatedUser = await UserData.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, 
        runValidators: true,
        context: 'query'
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    });
    
  } catch (error) {
    // Handle duplicate key errors
    if (error.code === 11000) {
      let message = 'Duplicate key error: ';
      if (error.keyPattern?.email) message = 'Email already exists';
      if (error.keyPattern?.referenceNumber) message = 'Reference number already exists';
      
      return res.status(400).json({
        success: false,
        message
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
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};