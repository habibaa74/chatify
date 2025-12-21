import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/update-profile", protect, updateProfile);

router.get("/check", protect, (req, res) => res.status(200).json(req.user));

export default router;
