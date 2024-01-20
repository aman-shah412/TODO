const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    Title: {
        type: String,
    },
    Description: {
        type: String,
    },
    Date: {
        type: Date,
        default: Date.now
    },
    DueDate: {
        type: String
    },
    Status: {
        type: String
    }
})

const TODO = mongoose.model("TODO", todoSchema)

module.exports = TODO;