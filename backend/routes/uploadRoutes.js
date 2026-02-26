import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/", requireAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "portfolio-projects" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    return res.json({ url: result.secure_url });
  } catch (e) {
    console.error("UPLOAD ERROR FULL:", e);
    return res.status(500).json({
      message: "Upload failed",
      error: e?.message || e?.error?.message || "Unknown error",
    });
  }
});

export default router;