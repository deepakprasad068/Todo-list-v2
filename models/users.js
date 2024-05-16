const mongoose = require("mongoose");






const task = require("./task")
const User = new mongoose.Schema({
    photo: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,

    },
    username: {
        type: String,
        required: true,

    },
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: task

    }]
})


var findOrCreate = require('mongoose-findorcreate')
User.plugin(findOrCreate);
const user = mongoose.model('User', User);

module.exports = user;

