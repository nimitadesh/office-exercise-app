const Message = require("../models/Message")
const asyncHandler = require("express-async-handler")

const saveMessage = asyncHandler(async (req, res) => {
    const { userQuestion, botResponse } = req.body
    const newMessage = new Message({ userQuestion, botResponse })
    const savedMessage = await newMessage.save()
    res.status(201).json(savedMessage)
})

const getAllMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        if (!messages) {
            return res.status(404).json({ message: "No messages found" })
        }
        res.json(messages);
    } catch (error) {
        console.error();
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = {
    saveMessage,
    getAllMessages,
};