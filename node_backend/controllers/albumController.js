
const AsyncHandler = require("express-async-handler"); // custom request handling
const Album = require("../models/albumModel");
const Track = require("../models/trackModel");
const mongoose = require("mongoose");


/**
 * @description Get All Albums
 * @route /albums/
 * @access Public
 * @method GET
 */
const index = AsyncHandler(async (req, res) => {

    const albums = await Album.find();

    res.status(200);

    res.json(albums);
});

/**
 * @description Create a new Album
 * @route /albums/
 * @access Private
 * @method POST
 */
const create = AsyncHandler(async (req, res) => {

    const id = mongoose.Types.ObjectId(req.body.artist_id);

    if (!req.body.title || !req.body.artwork || !req.body.genre || !req.body.year) {

        if (!req.body.title) {
            console.log("please add title");
        }

        if (!req.body.artwork) {
            console.log("please add artwork");
        }

        if (!req.body.genre) {
            console.log("please add genre");
        }

        if (!req.body.year) {
            console.log("please add year");
        }

        res.status(400);
        throw new Error("Please add missing fields to the request body");
    }

    else if (req.artist._id.equals(id)) {

        try {
            const album = await Album.create({
                title: req.body.title,
                artist_id: req.artist ? req.artist._id : "Cant get artist, No token",
                artwork: req.body.artwork,
                genre: req.body.genre,
                year: req.body.year
            });

            res.status(200);
            res.json(album);
        }
        catch (error) {
            res.status(400);
            throw new Error("Something went wrong when creating album" + error);
        }
    } else {
        res.status(403);
        throw new Error("Forbidden");
    }
});

/**
 * @description Show a specific Album's tracks
 * @route albums/:id
 * @access Public
 * @method GET
 */
const show = AsyncHandler(async (req, res) => {

    if (!req.params.id) {
        res.status(400);
    }

    // get all tracks associated with a specific album
    const tracks = await Track.find({ album_id: req.params.id });

    res.status(200);

    res.json(tracks);
});

/**
 * @description Edit a specific Album
 * @route /albums/:id
 * @access Private
 * @method PUT
 */
const update = AsyncHandler(async (req, res) => {

    const album = await Album.findById(req.params.id);

    if (!album) {
        res.status(400);
        throw new Error("Album not found, can not edit");
    }

    // check if artist has signed token, else throw errors
    const signedArtist = await req.artist;

    if (!signedArtist) {
        res.status(400);
        throw new Error("Not Authorized, Token not accepted");
    } else {
        // make sure the signed in artist matches the album's artist, else throw errors
        if (signedArtist._id.toString() === album.artist_id.toString()) {

            const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });

            res.status(200).json(updatedAlbum);
        } else {
            res.status(400);
            throw new Error("Not Authorized, Token does not match the one on record");
        }
    }
});

/**
 * @description Delete a specific Album
 * @route  /albums/:id
 * @access Private
 * @method DELETE
 */
const _delete = AsyncHandler(async (req, res) => {

    const album = await Album.findById(req.params.id);

    if (!album) {
        res.status(400);
        throw new Error("Album not found, can not delete");
    }

    // check if artist has signed token, else throw errors
    const signedArtist = await req.artist;

    if (!signedArtist) {
        res.status(400);
        throw new Error("Not Authorized, Token not accepted");
    } else {
        // make sure the signed in artist matches the album's artist, else throw errors
        if (signedArtist._id.toString() === album.artist_id.toString()) {
            const deletedAlbum = await Album.findByIdAndDelete(album);
            const now = new Date(Date.now()).toUTCString();

            res.json({ success: album.title + " was removed from database at " + now, deletedAlbum });
        } else {
            res.status(400);
            throw new Error("Not Authorized, Token does not match the one on record");
        }
    }
});

module.exports = { index, create, update, _delete, show }