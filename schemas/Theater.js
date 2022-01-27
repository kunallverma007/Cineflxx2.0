const mongoose = require("mongoose");
const movie = require("./Movie");
const { isEmail, isAlpha } = require("validator");
const bcrypt = require("bcrypt");
const Theater = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail, "Please enter valid email"],
    unique: [true, "Email is already registered !!"],
  },
  username: {
    type: String,
    required: [true, "Enter username"],
    validate: [isAlpha, "Usernames may only have letters."],
  },

  password: {
    type: String,
    required: [true, "Enter password"],
    minLength: [8, "Password should be at least 8 characters"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  city: {
    type: String,
    required: [true, "Please enter a city"],
    validate: [isAlpha, "City name may only have letters."],
  },
  movies: {
    type: [String],
  },
  booking: {
    type: [String],
    default: [],
  },
});
// fire a function before doc saved to db
Theater.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
Theater.statics.login = async function (email, password) {
  // console.log(email, password);
  const user = await this.findOne({ email });
  if (user) {
    if (!user.verified) {
      throw Error("User not verified");
    }
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};
Theater.statics.findBycity = function (_id, city) {
  return this.findOne({ _id: _id, city: city });
};
module.exports = mongoose.model("Theater", Theater);
