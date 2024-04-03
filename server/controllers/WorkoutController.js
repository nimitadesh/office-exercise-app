const Workout = require("../models/Workout");
const asyncHandler = require("express-async-handler");

const getAllWorkouts = asyncHandler(async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    console.error();
    res.status(500).json({ message: "Server error" });
  }
});
