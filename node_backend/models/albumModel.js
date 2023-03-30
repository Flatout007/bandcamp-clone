const mongoose = require("mongoose");

const Album = mongoose.Schema({

    artist_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Artist"
    },
    title: {
        type: String,
        required: [true, "Please enter an album title"]
    },
    artwork: {
        type: String,
        required: [true,"Please enter a artwork field"]
    },
    year: {
        type: Number,
        required: [true, "Please enter a date field"]
    },
    genre: {
        type: String,
        required: [true, "Please enter a genre field"]
    },
}, { timestamps: true });

module.exports = mongoose.model("Album", Album);