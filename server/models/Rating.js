const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workout",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
