const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

// sign up
userRouter.post("/signup", async (req, res) => {
  try {
    const newUser = new User({
      ...req.body,
    });
    await newUser.save();
    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkUser = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!checkUser) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    const isPasswordValid = await bcrypt.compare(password, checkUser.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Username or Password" });
    }

    return res.status(200).json({
      status: true,
      username: checkUser.username,
      message: "User logged in successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = userRouter;
