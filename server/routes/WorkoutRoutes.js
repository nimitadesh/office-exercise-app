const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/WorkoutController");

router
  .get("/", workoutController.getAllWorkouts)
  .get("/:workoutId", workoutController.getWorkoutById);

module.exports = router;
