const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    userQuestion: {
        type: String,
        required: true,
    },
    botResponse: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Message', messageSchema)