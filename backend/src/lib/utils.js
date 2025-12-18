import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 124 * 60 * 60 * 1000, //7days in Milisecond
    httpOnly: true, //Prevent XSS attacks
    sameSite: "strict", //CSRF attack
    // it depend in the environment
    secure: process.env.NODE_ENV === "development" ? false : true,
  });
  return token;
};
