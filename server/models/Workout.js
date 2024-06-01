const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  exercises: [exerciseSchema],
  duration: {
    type: Number,
    required: true,
  },
  intensity: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  equipment: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Workout", workoutSchema);
