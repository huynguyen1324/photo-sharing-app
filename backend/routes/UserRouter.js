const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.get("/list", async (request, response) => {
    const users = await User.find();
    response.json(users);
});

router.get("/:id", async (request, response) => {
    const { id } = request.params;
    const user = await User.findOne({ _id: id });
    response.json(user);
});


module.exports = router;