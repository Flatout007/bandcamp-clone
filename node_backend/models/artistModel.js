const mongoose = require("mongoose");

const Artist = mongoose.Schema({

    email: {
        type: String,
        required: [true, "Please add a email field to the request body"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password field to the request body"],
    },
    name: {
        type: String,
        required: [true, "Please add a name field to the request body"],
        unique: true
    },
    bio: {
        type: String
    },
    photo: {
        type: String
    },
    location: {
        type: String
    }

}, {timestamps: true});

module.exports = mongoose.model("Artist", Artist);