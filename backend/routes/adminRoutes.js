import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

export default router;