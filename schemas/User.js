const mongoose = require("mongoose");
const { isEmail, isAlpha } = require("validator");

const bcrypt = require("bcrypt");
const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail, "Enter valid email"],
    unique: [true,"Email is already registered !!"]
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
  booking: {
    type: [String],
    default: [],
  },
});
// fire a function before doc saved to db
User.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
User.statics.login = async function (email, password) {
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



module.exports = mongoose.model("User", User);
