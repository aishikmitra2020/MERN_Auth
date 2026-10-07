import express from 'express'
import { loginUser, logoutUser, myProfile, refreshToken, registerUser, verifyOtp, verifyUser } from "../controllers/user.js"
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.post("/verify", verifyOtp);
router.post("/refresh", refreshToken);
router.post("/logout", isAuth, logoutUser);

router.get("/me", isAuth, myProfile);

export default router;