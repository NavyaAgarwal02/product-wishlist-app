const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ message: "Email and name are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: "User already exists", user: existing });
    }

    const user = new User({ email, name });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Instead of sending 404, we'll create a new user
      const name = req.body.name;
      if (!name) {
        return res.status(400).json({ message: "Name is required for new user" });
      }

      const newUser = new User({ email, name });
      await newUser.save();
      return res.status(201).json({ message: "New user created", user: newUser });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Error during login", error: error.message });
  }
});

module.exports = router;