const { Login } = require("../controllers/AuthController.js");
const router = require("express").Router();

router.post("/login", Login);

module.exports = router;
