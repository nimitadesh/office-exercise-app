const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");

router.post("/", MessageController.saveMessage)
router.get("/", MessageController.getAllMessages)
module.exports = router;