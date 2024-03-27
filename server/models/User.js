const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.path("firstName").checkRequired((v) => v != null);
userSchema.path("lastName").checkRequired((v) => v != null);
userSchema.path("username").checkRequired((v) => v != null);
userSchema.path("password").checkRequired((v) => v != null);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
