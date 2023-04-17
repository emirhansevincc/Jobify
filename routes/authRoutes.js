import express from "express";
import { register, login, updateUser, getCurrentUser, logout } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many accounts created from this IP, please try again after 15 minutes"
});

const router = express.Router();

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/updateUser').patch(authenticateUser ,updateUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);
router.route('/logout').get(logout);

export default router;