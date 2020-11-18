const express = require("express");
const router = express.Router();
const { Skill } = require("../models/Skill");

// Create Skill
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const skill = new Skill({ name });
    await skill.save();
    res.status(201).send(skill);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Get Skills
router.get("/", async (req, res) => {
  try {
    const skill = await Skill.find();
    res.status(200).send(skill);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

module.exports = router;
