const mongoose = require("mongoose");
const userSchema = require("./userModel").schema;

const commentSchema = new mongoose.Schema({
  comment: String,
  date_time: { type: Date, default: Date.now },
  user: userSchema,
});

const photoSchema = new mongoose.Schema({
  file_name: { type: String },
  date_time: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Photo" },
  comments: [commentSchema],
});

const Photo = mongoose.model.Photos || mongoose.model("Photos", photoSchema);

module.exports = Photo;
