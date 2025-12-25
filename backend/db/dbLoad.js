const mongoose = require("mongoose");
require("dotenv").config();

const models = require("../modelData/models.js");
const User = require("./userModel.js");
const Photo = require("./photoModel.js");
const SchemaInfo = require("./schemaInfo.js");


const versionString = "1.0";

async function dbLoad() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to MongoDB Atlas!");

    // Xoá toàn bộ Database hiện tại
    await mongoose.connection.dropDatabase();
    console.log("Database deleted successfully.");

  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }

  const users = models.users;
  const photos = models.photos;
  const comments = models.comments;

  // Bước 1: Tạo tất cả users
  for (const user of users) {
    try {
      const userObj = await User.create({
        _id: user._id,
        username: user.username,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        location: user.location,
        description: user.description,
        occupation: user.occupation,
        role: user.role,
        friends: user.friends,
      });

      console.log(`Added user: ${user.first_name} ${user.last_name}`);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  // Bước 2: Gom nhóm các comments theo photoId

  const commentsByPhotoId = new Map();
  for (const comment of comments) {
    if (!commentsByPhotoId.has(comment.photo_id)) {
      commentsByPhotoId.set(comment.photo_id, []);
    }
    commentsByPhotoId.get(comment.photo_id).push(comment);
  }

  // Bước 3: Tạo tất cả photos
  for (const photo of photos) {
    try {
      const photoComments = commentsByPhotoId.get(photo._id) || [];

      const photoObj = await Photo.create({
        _id: photo._id,
        file_name: photo.file_name,
        date_time: photo.date_time,
        user_id: photo.user_id,
        comments: photoComments,
      });

      console.log(
        `Added photo: ${photo.file_name} with ${photoComments.length} comments`
      );
    } catch (error) {
      console.error("Error creating photo:", error);
    }
  }

  // Bước 4: Tạo SchemaInfo
  try {
    const schemaInfo = await SchemaInfo.create({
      version: versionString,
    });
    console.log("SchemaInfo object created with version", schemaInfo.version);
  } catch (error) {
    console.error("Error creating schemaInfo:", error);
  }

  mongoose.disconnect();
  console.log("Connection closed.");
}

dbLoad();
