const express = require("express");
const Photo = require("../db/photoModel");
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

router.get("/:photoId", async (request, response) => {
    const { photoId } = request.params;
    const photo = await Photo.findById(photoId);
    response.json(photo);
});

module.exports = router;
