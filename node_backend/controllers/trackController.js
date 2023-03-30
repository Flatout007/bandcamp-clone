
const AsyncHandler = require("express-async-handler"); // custom request handling
const Track = require("../models/trackModel");

/**
 * @description Get All Tracks
 * @route /tracks/
 * @access Public
 * @method GET
 */
const index = AsyncHandler(async (req, res) => {
    // query mongodb for all tracks
    const tracks = await Track.find();

    res.status(200);

    res.json(tracks);
});

/**
 * @description Create a new Track
 * @route /tracks/
 * @access Private
 * @method POST
 */
const create = AsyncHandler(async (req, res) => {

    if (!req.body.titles) {
        res.status(400);
        throw new Error("Please add missing titles to the request body");
    }

    if (!req.body.files) {
        res.status(400);
        throw new Error("Please add missing files to the request body");
    }
    else {

        const tracks = [];

        for (let i = 0; i < req.body.files.length; i++) {

            const file = req.body.files[i];
            const title = req.body.titles[i];

            const track = await Track.create({
                title: title,
                artist_id: req.body.artist_id,
                album_id: req.body.album_id,
                file: file,
            });

            tracks.push(track);
        }

        res.status(200);
        res.json(tracks);
    }
});

// /**
//  * @description Edit a specific Album
//  * @route /albums/:id
//  * @access Private
//  * @method PUT
//  */
// const update = AsyncHandler(async (req, res) => {

//     const album = await Album.findById(req.params.id);

//     if (!album) {
//         res.status(400);
//         throw new Error("Album not found, can not edit");
//     }

//     // check if artist has signed token, else throw errors
//     const signedArtist = await req.artist;

//     if (!signedArtist) {
//         res.status(400);
//         throw new Error("Not Authorized, Token not accepted");
//     } else {
//         // make sure the signed in artist matches the album's artist, else throw errors
//         if (signedArtist._id.toString() === album.artist_id.toString()) {

//             const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });

//             res.status(200).json(updatedAlbum);
//         } else {
//             res.status(400);
//             throw new Error("Not Authorized, Token does not match the one on record");
//         }
//     }
// });

// /**
//  * @description Delete a specific Album
//  * @route  /albums/:id
//  * @access Private
//  * @method DELETE
//  */
// const _delete = AsyncHandler(async (req, res) => {

//     const album = await Album.findById(req.params.id);

//     if (!album) {
//         res.status(400);
//         throw new Error("Album not found, can not delete");
//     }

//     // check if artist has signed token, else throw errors
//     const signedArtist = await req.artist;

//     if (!signedArtist) {
//         res.status(400);
//         throw new Error("Not Authorized, Token not accepted");
//     } else {
//         // make sure the signed in artist matches the album's artist, else throw errors
//         if (signedArtist._id.toString() === album.artist_id.toString()) {
//             const deletedAlbum = await Album.findByIdAndDelete(album);
//             const now = new Date(Date.now()).toUTCString();

//             res.json({ success: album.title + " was removed from database at " + now, deletedAlbum });
//         } else {
//             res.status(400);
//             throw new Error("Not Authorized, Token does not match the one on record");
//         }
//     }
// });

module.exports = { index, create }