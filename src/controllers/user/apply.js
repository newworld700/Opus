import AppliedUser from "../../models/applieduser.js";

import { generateReferenceNumber } from "../../utils.js";

export const applyUser = async (userData) => {
  

    const rest=userData;


    const referenceNumber = generateReferenceNumber();
    const isReferenceNumberGenerated = true;


  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      const newUser = new AppliedUser({
        ...rest,
        referenceNumber,
      });
      return await newUser.save();
    } catch (error) {
      // Handle duplicate errors
      if (error.code === 11000) {
        if (error.keyPattern.email) {
          throw { status: 400, message: 'Email already exists' };
        } else if (error.keyPattern.referenceNumber) {
          if (isReferenceNumberGenerated) {
            attempts++;
            if (attempts >= maxAttempts) {
              throw {
                status: 500,
                message: 'Failed to generate unique reference number',
              };
            }
            referenceNumber = generateReferenceNumber(); // Regenerate for next attempt
          } else {
            throw { status: 400, message: 'Reference number already exists' };
          }
        }
      } 
      // Handle validation errors (e.g., missing fields)
      else if (error.name === 'ValidationError') {
        throw { status: 400, message: error.message };
      } 
      // All other errors
      else {
        throw { status: 500, message: 'Internal server error' };
      }
    }
  }
};




const apply = async (req, res)=> {
    try {
        const appliedUser = await applyUser(req.body);
        res.status(200).json({
          success: true,
          data: appliedUser,
          message: 'Application submitted successfully',
        });
      } catch (error) {
        res.status(error.statusCode || 500).json({
          success: false,
          message: error.message,
        });
      }
};

export { apply };