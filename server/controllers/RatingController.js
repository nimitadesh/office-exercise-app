const express = require("express");
const asyncHandler = require("express-async-handler");
const Rating = require("../models/Rating");

const router = express.Router();

const getAllUserRatings = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const ratings = await Rating.find({ userId });

    if (!ratings || ratings.length === 0) {
      return res.status(404).json({ message: "No ratings found for the user" });
    }

    res.json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  getAllUserRatings,
};