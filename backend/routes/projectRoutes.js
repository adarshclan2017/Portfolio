import express from "express";
import Project from "../models/Project.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// public
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (e) {
    res.status(500).json({ message: "Failed to load projects" });
  }
});

// admin create
router.post("/", requireAdmin, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// admin update
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// admin delete
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;