const mongoose = require("mongoose");

const task = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    state: {
        type: Boolean,
        default: false
    }
})

const tasks = mongoose.model("task", task);

module.exports = tasks;