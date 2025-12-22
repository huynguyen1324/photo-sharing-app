const express = require("express");
const multer = require("multer");
const path = require("path");
const Photo = require("../db/photoModel");
const router = express.Router();
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './public/images'));
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

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    const photos = await Photo.find({user_id: userId});
    res.json(photos);
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

router.get("/detail/:photoId", async (req, res) => {
    const { photoId } = req.params;
    const photo = await Photo.findOne({_id: photoId});
    res.json(photo);
});

router.post("/detail/:photoId/comment", async (req, res) => {
    const { photoId } = req.params;
    const { comment, user } = req.body;
    const date_time = new Date();
    const photo = await Photo.findOne({_id: photoId});
    photo.comments.push({comment, date_time, user});
    const savedPhoto = await photo.save();
    res.json(savedPhoto);
});

router.delete("/detail/:photoId", async (req, res) => {
    const { photoId } = req.params;
    const photo = await Photo.findOneAndDelete({_id: photoId});
    
    return res.status(200).json({message: "Photo deleted."});
})

router.delete("/detail/:photoId/comment", async (req, res) => {
    const { photoId } = req.params;
    const { comment } = req.body;
    const photo = await Photo.findOne({_id: photoId});
    photo.comments.pop(comment);
    await photo.save();

    return res.status(200).json(photo);
})

module.exports = router;
