// controllers/userController.js
import UserData from '../../models/userdata.js';
import fs from 'fs';
import path from 'path';

// Helper function to delete files
const deleteFiles = (filePaths) => {
  filePaths.forEach(filePath => {
    if (filePath) {
      const fullPath = path.join(process.cwd(), 'public', filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, err => {
          if (err) console.error(`Error deleting file ${filePath}:`, err);
        });
      }
    }
  });
};

export const deleteUser = async (req, res) => {
  try {

    const { id } = req.params;

    // Find the user first to get file paths
    const user = await UserData.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Collect all file paths to delete
    const filesToDelete = [];
    
    // Add profile photo if exists
    if (user.photo) {
      filesToDelete.push(user.photo);
    }
    
    // Add documents
    if (user.documents && user.documents.length > 0) {
      user.documents.forEach(doc => {
        if (doc.url) filesToDelete.push(doc.url);
      });
    }

    // Delete the user from database
    await UserData.findByIdAndDelete(id);
    
    // Delete associated files
    if (filesToDelete.length > 0) {
      deleteFiles(filesToDelete);
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};