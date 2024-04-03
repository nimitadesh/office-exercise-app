const Workout = require("../models/Workout");
const asyncHandler = require("express-async-handler");

const getAllWorkouts = asyncHandler(async (req, res) => {
  try {
    const workouts = await Workout.find();
    if (!workouts) {
      return res.status(404).json({ message: "No workouts found" });
    }
    res.json(workouts);
  } catch (error) {
    console.error();
    res.status(500).json({ message: "Server error" });
  }
});

const getWorkoutById = asyncHandler(async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json(workout);
  } catch (error) {
    console.error();
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  getAllWorkouts,
  getWorkoutById,
};
