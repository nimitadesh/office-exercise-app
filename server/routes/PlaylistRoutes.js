const express = require("express");
const router = express.Router();
const playlistsController = require("../controllers/PlaylistController");

router
  .get("/:userId", playlistsController.getPlaylistsByUser)
  .patch("/:playlistId/workouts", playlistsController.addWorkoutToPlaylist)
  .post("/", playlistsController.createPlaylist);

module.exports = router;
