const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

workoutSchema.path("title").checkRequired((v) => v != null);
workoutSchema.path("description").checkRequired((v) => v != null);
workoutSchema.path("duration").checkRequired((v) => v != null);
workoutSchema.path("type").checkRequired((v) => v != null);

module.exports = mongoose.model("Workout", workoutSchema);
