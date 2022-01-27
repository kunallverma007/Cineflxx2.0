const mongoose = require("mongoose");
const Booking = new mongoose.Schema({
  movie_id: {
    type: Number,
    required: true,
  },
  theater: {
    type: String, //id of the theater
    required: true,
  },
  user: {
    type: String, //id of the user
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  slot: {
    type: Number,
    required: true,
  },

  payment: {
    type: Boolean,
    default: false,
  },
  pack: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Booking", Booking);
