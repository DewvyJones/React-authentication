const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { auth } = require("../middlewares/Auth");
const router = express.Router();

router.post("/api/register", async (req, res) => {
  const formData = req.body.formData;
  if (!formData) {
    res.status(400).json({ message: "No info" });
  }
  try {
    // create user
    const user = await new User(formData);

    // hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.formData.password, salt);
    await user.save();
    res.status(200).json({ message: "register success!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "register fail!" });
  }
});

router.post("/api/login", async (req, res) => {
  const formData = req.body.formData;
  try {
    const user = await User.findOne({
      email: formData.email,
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid login!" });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(
      formData.password,
      user.password
    );

    // Verify password
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secret123"
      );
      res.status(200).json({ message: "login success!", user: token });
    } else {
      res.status(401).json({ message: "Invalid password!" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error, message: "login fail!" });
  }
});

router.get("/me", auth, async (req, res) => {
  res.status(200).json(req.user);
});

exports.router = router;
