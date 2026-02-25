import express from "express";
import Message from "../models/Message.js";
import { requireAdmin } from "../middleware/auth.js";
import { sendContactMail } from "../utils/mailer.js";

const router = express.Router();

// public: save + email notify
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const saved = await Message.create({ name, email, message });

    // send email but don't block success
    sendContactMail({ name, email, message }).catch((e) =>
      console.error("MAIL ERROR:", e.message)
    );

    res.status(201).json({ message: "Message sent ✅", saved });
  } catch (e) {
    res.status(400).json({ message: e.message || "Failed" });
  }
});

// admin: view messages
router.get("/", requireAdmin, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});


// Delete single message
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (e) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// Delete all messages
router.delete("/", requireAdmin, async (req, res) => {
  try {
    await Message.deleteMany({});
    res.json({ message: "All messages cleared" });
  } catch (e) {
    res.status(500).json({ message: "Clear failed" });
  }
});

export default router;