import AppliedUser from "../../models/applieduser.js";

export const getAllAppliedUsers = async (req, res) => {
  try {
    const appliedUsers = await AppliedUser.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.status(200).json({ 
      success: true, 
      message: 'Applied users retrieved successfully', 
      data:appliedUsers 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

