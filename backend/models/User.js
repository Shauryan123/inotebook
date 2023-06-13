const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    default: "https://e0.pxfuel.com/wallpapers/105/23/desktop-wallpaper-compromised-character-gaming-profile-dark-cute-cartoon-boys.jpg"
  },
  designation: {
    type: String,
    default: "Sustainability Analyst"
  },
  date: {
    type: Date,
    default: Date.now
  },
  numberOfNotes: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
