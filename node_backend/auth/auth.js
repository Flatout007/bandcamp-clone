const jwt = require("jsonwebtoken");
const AsyncHandler = require("express-async-handler");
const Artist = require("../models/artistModel");

const protect = AsyncHandler(async (req, res, next) => {

    let token;

    // if authorized header is included in req
    if (req.headers.authorization) {

        if (req.headers.authorization.startsWith("Bearer")) {
            try {
                // get token from header
                token = req.headers.authorization.split(" ")[1];

                // verify token 
                const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

                // get artist from verified token
                const artist = await Artist.findById(verifiedToken.id).select("-password");

                if (artist) {
                    // adds custom property to the req,res cycle until user signs out
                    req.artist = artist;
                }

                // continue to the next piece of middleware
                next();
            } catch (error) {
                res.status(401);
                throw new Error("Authentication failed, Token Not Authorized");
            }
        }
    }

    if (token == null) {
        res.status(401);
        throw new Error("Access Denied, No token");
    }
});

module.exports = protect; 