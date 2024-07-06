const express = require("express");
const asyncHandler = require("express-async-handler");
const Playlist = require("../models/Playlist");

const router = express.Router();

const getPlaylistsByUser = asyncHandler(async (req, res) => {
  try {
    const createdBy = req.params.userId;
    const playlists = await Playlist.find({ createdBy }).populate("workouts");

    if (!playlists || playlists.length === 0) {
      return res
        .status(404)
        .json({ message: "No playlists found for the user" });
    }

    res.json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const addWorkoutToPlaylist = asyncHandler(async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { workoutId } = req.body;

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (!playlist.workouts.includes(workoutId)) {
      playlist.workouts.push(workoutId);
      await playlist.save();
    }

    res.status(200).json(playlist);
  } catch (error) {
    console.error("Error adding workout to playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const createPlaylist = asyncHandler(async (req, res) => {
  try {
    const { title, createdBy, workouts } = req.body;
    const newPlaylist = new Playlist({ title, createdBy, workouts });
    const savedPlaylist = await newPlaylist.save();
    res.status(201).json(savedPlaylist);
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  getPlaylistsByUser,
  addWorkoutToPlaylist,
  createPlaylist,
};
