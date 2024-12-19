import express from "express";
import { loginOrRegister, verifyOtp } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginOrRegister);
router.post("/verify", verifyOtp);

export default router;
