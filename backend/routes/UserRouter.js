const express = require("express");
const User = require("../db/userModel");
const Photo = require("../db/photoModel");
const router = express.Router();

router.get("/list", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/stats", async (req, res) => {
  const photos = await Photo.find();

  const count_photos = {};
  const count_comments = {};

  for (const photo of photos) {
    const userId = photo.user_id.toString();
    count_photos[userId] = (count_photos[userId] || 0) + 1;
    for (const comment of photo.comments) {
      const userComment = comment.user._id.toString();
      count_comments[userComment] = (count_comments[userComment] || 0) + 1;
    }
  }

  return res.json({ count_photos, count_comments });
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  res.json(user);
});

router.get("/:id/photos", async (req, res) => {
  const { id } = req.params;
  const photos = await Photo.find({ user_id: id });
  res.json(photos);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(401).json({ message: "Wrong username or password" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = new User(req.body);
    await user.save();
    res.status(200).json({ message: "Register successfully" });
  } catch (err) {
    res.status(400).json({ message: "Register failed" });
  }
});


module.exports = router;