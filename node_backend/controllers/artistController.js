const AsyncHandler = require("express-async-handler");
const Artist = require("../models/artistModel");
const Album = require("../models/albumModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * @description Signs the artist in
 * @route /artists/signin
 * @access Public
 * @method POST
 */
const signin = AsyncHandler(async (req, res) => {

    // get required fields from req body
    const { email, password } = req.body;

    // check if email exist
    const artist = await Artist.findOne({ email });

    if (!password || !email || !artist) {
        res.status(401).json("Invalid Username or Password");
    }

    if (artist) {

        // check if hashed password matches password the user typed in
        const passwordSuccess = await bcrypt.compare(password, artist.password);

        if (passwordSuccess) {
            res.json({
                success: "user " + artist.name + " has signed in",
                name: artist.name,
                email: artist.email,
                bio: artist.bio,
                location: artist.location,
                _id: artist._id,
                session: { sessionToken: generateJWSToken(artist._id), name: artist.name }
            });
        } else {
            res.status(401).json("Password Failed");
            throw new Error("Password Failed");
        }
    } else {
        res.status(400).json("Password Failed")
        throw new Error("Invalid Credentials");
    }
});


/**
 * @description Authenticate and create  a new artist 
 * @route /artists/signup
 * @access Public
 * @method POST
 */
const signup = AsyncHandler(async (req, res) => {

    // get req from body
    const { name, email, password, bio, location } = req.body

    // validate req name, email, password
    if (!name || !email || !password) {
        res.status(400).json("You are missing a required field");
    }
    const emailIsTaken = Boolean(await Artist.findOne({ email }));
    const nameIsTaken = Boolean(await Artist.findOne({ name }));

    if (emailIsTaken || nameIsTaken) {
        res.status(400);
        throw new Error("Artist already exist");
    } else {

        // random string of characters that's added to password before it's hashed
        const salt = await bcrypt.genSalt();

        const hashedPassword = await bcrypt.hash(password, salt);

        // create artist 
        const newArtist = await Artist.create({
            name: name,
            email: email,
            password: hashedPassword,
            bio: bio,
            location: location
        });

        // send successful create status
        if (newArtist) {
            res.status(201).json({
                success: "user " + newArtist.name + " has signed in",
                name: name,
                email: email,
                bio: bio,
                location: location,
                _id: newArtist._id,
                session: { sessionToken: generateJWSToken(newArtist._id), name: newArtist.name }
            });
        } else {
            res.status(400);
            throw new Error("Artist not created, please check validity of field data");
        }
    }
});


/**
 * @description Gets the Artist that's currently signed in
 * @route /artists/me
 * @access Private
 * @method GET
 */
const getCurrentlySignedInArtist = AsyncHandler(async (req, res) => {

    const { name, email, _id } = await Artist.findById(req.artist._id);

    res.status(200).json({
        _id,
        name,
        email
    });
});

// generate a token used to sign and cache user credentials or user data
const generateJWSToken = (id) => {

    const token = jwt.sign({ id }, process.env.JWT_SECRET);

    return token;
}

/**
 * @description Get All artist
 * @route /artists/
 * @access Private
 * @method GET
 */
const index = AsyncHandler(async (req, res) => {

    const artists = await Artist.find().select("-password");

    res.status(200);
    res.json(artists);
});

/**
 * @description Get All artist's albums
 * @route /artists/:id
 * @access Public
 * @method GET
 */
const show = AsyncHandler(async (req, res) => {

    // find all albums where artist_id equals req params id
    try {
        const albums = await Album.find({ artist_id: req.params.id});

        if (albums) {
            res.status(200);
            res.json(albums);
        }
    } catch (error) {
        res.json("Cant retrieve albums");
        res.status(401);
    }
});

/**

@description Edit a specific Artist

@route /artists/:id

@access Private

@method PUT
*/
const update = AsyncHandler(async (req, res) => {

    const artist = await Artist.findById(req.params.id);

    if (!artist) {
        res.status(400);
        throw new Error("Artist not found, can not edit");
    }

    // check if artist has signed token, else throw errors
    const signedArtist = await req.artist;

    if (!signedArtist) {
        res.status(400);
        throw new Error("Not Authorized, Token not accepted");
    } else {
        // make sure the signed in artist matches the Artist's id, else throw errors
        if (signedArtist._id.toString() === artist._id.toString()) {

            const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });

            res.status(200).json(updatedArtist);
        } else {
            res.status(400);
            throw new Error("Not Authorized, Token does not match the one on record");
        }
    }
});

/**
 * @description Delete a specific Artist
 * @route  /artists/:id
 * @access Private
 * @method DELETE
 */
const _delete = AsyncHandler(async (req, res) => {


});

module.exports = { show, index, update, _delete, signin, getCurrentlySignedInArtist, signup }