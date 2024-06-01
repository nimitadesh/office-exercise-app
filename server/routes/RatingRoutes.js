const express = require("express");
const router = express.Router();
const ratingsController = require("../controllers/RatingController");

router.get("/:userId", ratingsController.getAllUserRatings);

module.exports = router;
