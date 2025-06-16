
import UserData from "../../models/userdata.js";



const getRegisteredUserById = async (id) => {
    try {
      const registeredUser = await UserData.findById(id) // Exclude password field
      if (!registeredUser) {
        return { 
          success: false, 
          error: 'Registered user not found' 
        };
      }
      return { 
        success: true, 
        message: 'Registered user retrieved successfully', 
        data:registeredUser 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  };
  


  export const getRegisteredUser=async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate ID format
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid user ID format'
        });
      }
      
      const result = await getRegisteredUserById(id);
      
      if (!result.success) {
        return res.status(404).json(result);
      }
      
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server error: ' + error.message
      });
    }
  }