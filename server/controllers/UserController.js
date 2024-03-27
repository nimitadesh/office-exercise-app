const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const createNewUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  const newUser = new User({ firstName, lastName, username, password });
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

module.exports = {
  createNewUser,
};
