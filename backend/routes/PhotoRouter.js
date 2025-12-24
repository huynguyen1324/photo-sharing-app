const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Photo = require("../db/photoModel");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});

router.get("/list", async (req, res) => {
    const photos = await Photo.find();
    res.json(photos);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const photo = await Photo.findOne({_id: id});
    res.json(photo);
});

router.post("/upload", upload.single('photo'), async (req, res) => {
    try {
        const newPhoto = new Photo({
            file_name: req.file.filename,
            date_time: new Date(),
            user_id: req.body.userId
        });
        
        const savedPhoto = await newPhoto.save();

        return res.status(200).json(savedPhoto);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

router.post("/:id/comment", async (req, res) => {
    const { id } = req.params;
    const { comment, user } = req.body;
    const date_time = new Date();
    const photo = await Photo.findOne({_id: id});
    photo.comments.push({comment, date_time, user});
    const savedPhoto = await photo.save();
    res.json(savedPhoto);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const photo = await Photo.findOneAndDelete({_id: id});
    
    const filePath = path.join(__dirname, '../public/images', photo.file_name);
    console.log(filePath);
    if(fs.existsSync(filePath)) fs.unlinkSync(filePath);

    return res.status(200).json({message: "Photo deleted."});
})

router.delete("/:id/comment", async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const photo = await Photo.findOne({_id: id});
    photo.comments.pop(comment);
    await photo.save();

    return res.status(200).json(photo);
})

module.exports = router;
