const express = require("express");
const Photo = require("../db/photoModel");
const { now } = require("mongoose");
const router = express.Router();

router.get("/list", async (request, response) => {
    const photos = await Photo.find();
    response.json(photos);
});

router.get("/:userId", async (request, response) => {
    const { userId } = request.params;
    const photos = await Photo.find({user_id: userId});
    response.json(photos);
});

router.post("/:userId/upload", async (request, response) => {
    const { userId, fileName } = request.params;
    const date_time = new Date();
    const photo = new Photo({
        file_name: fileName,
        date_time: date_time,
        user_id: userId,
        comments: [],
    })
    await photo.save();
    response.status(200).json({message: "Upload photo successfully!"})
});

router.get("/detail/:photoId", async (request, response) => {
    const { photoId } = request.params;
    const photo = await Photo.findOne({_id: photoId});
    response.json(photo);
});

router.post("/detail/:photoId/comment", async (request, response) => {
    const { photoId } = request.params;
    const { comment, user } = request.body;
    const date_time = new Date();
    const photo = await Photo.findOne({_id: photoId});
    photo.comments.push({comment, date_time, user});
    await photo.save();
    response.json(photo);
});

module.exports = router;
