const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  location: { type: String },
  description: { type: String },
  occupation: { type: String },
  username: { type: String },
  password: { type: String },
  friends: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
  ],
});

const User = mongoose.model.Users || mongoose.model("Users", userSchema);

module.exports = User;
