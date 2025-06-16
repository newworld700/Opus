import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { checkAuth, login, logout } from "../controllers/user/login.js";
import { apply } from "../controllers/user/apply.js";
import { fetchuserdata } from "../controllers/user/getdata.js";
import { getFile } from "../controllers/user/getFile.js";
const router = express.Router();

router.post("/login",login)
router.post("/logout",protect,logout)
router.get("/check",checkAuth)
router.get("/me",protect,fetchuserdata)
router.get('/:filename', getFile);
router.post("/apply",apply)


export default router;
