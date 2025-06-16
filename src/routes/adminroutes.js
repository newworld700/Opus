import express from 'express';
import { registerUser } from '../controllers/admin/createUser.js';
import { getAllAppliedUsers } from '../controllers/admin/getAppliedUser.js';

import { getAllRegisteredUsers } from '../controllers/admin/getAllregisterdUser.js';
import { getRegisteredUser } from '../controllers/admin/getRegisteruserbyid.js';
import { updateUser } from '../controllers/admin/updateRegUser.js';
import { adminProtect } from '../middleware/authMiddleware.js';
import { generateOtp } from '../controllers/admin/generateOtp.js';
import { registerAdmin } from '../controllers/admin/registerAdmin.js';
import { checkAuth, login, logout } from '../controllers/admin/adminlogin.js';
import { verifyOtp } from '../controllers/admin/verifyOtp.js';
import { upload, handleFileUploadErrors } from '../utils/fileUpload.js';
import { deleteUser } from '../controllers/admin/deleteUser.js';
const router = express.Router();


router.post("/login",login);
router.post("/logout",logout)
router.get("/check",checkAuth)



router.post("/generate-otp",generateOtp);
router.post("/verify-otp",verifyOtp);
router.post("/register-admin", registerAdmin);


router.post(
    '/register',
    upload.fields([
      { name: 'photo', maxCount: 1 },
      { name: 'documents', maxCount: 5 }
    ]),adminProtect,
    handleFileUploadErrors,
    registerUser
  );
  
router.get('/get-applied-user',adminProtect,getAllAppliedUsers)
router.get('/get-register-user',adminProtect,getAllRegisteredUsers)
router.delete('/delete/:id',adminProtect, deleteUser)
router.get('/get-register-user/:id',adminProtect,getRegisteredUser)
router.put('/update-register-user/:id',adminProtect, upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
  ]),
  handleFileUploadErrors,
  updateUser)
export default router;