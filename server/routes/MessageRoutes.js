const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");

router.post("/", MessageController.saveMessage)
router.get("/", MessageController.getAllMessages)
router.get("/:userId", MessageController.getMessagesByUser)
module.exports = router;