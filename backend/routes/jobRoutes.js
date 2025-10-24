const express = require("express");
const Job = require("../models/Job");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { companyName, jobTitle, applicationDate, status } = req.body;
    const job = await Job.create({
      companyName,
      jobTitle,
      applicationDate,
      status,
      user: req.user.id,
    });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all jobs of user
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ applicationDate: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Job.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
