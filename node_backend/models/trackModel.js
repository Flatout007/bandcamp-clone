const mongoose = require("mongoose");

const Track = mongoose.Schema({

    album_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Album"
    },
    artist_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Artist"
    },
    title: {
        type: String,
        required: [true, "Please enter an album title"]
    },
    file: {
        type: String,
        required: [true, "Please enter a link to an audio file"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Track", Track);