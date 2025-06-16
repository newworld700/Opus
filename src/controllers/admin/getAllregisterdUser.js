import UserData from "../../models/userdata.js";

export const getAllRegisteredUsers = async (req, res) => {
  try {
    const registeredUsers = await UserData.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.status(200).json({ 
      success: true, 
      message: 'Registered users retrieved successfully', 
      data:registeredUsers 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

