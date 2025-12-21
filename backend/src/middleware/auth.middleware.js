import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import { ENV } from "../lib/env.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    console.log("error in protet middleware");
    res.status(500).json({ message: "Internal server error" });
  }
};
