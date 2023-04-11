
const express = require("express");
const dotenv = require("dotenv").config();
const { Errors } = require("./errors/Error");
const colors = require("colors");
const connectDB = require("./database/db");
const cors = require("cors");

const port = process.env.PORT || 5000;
const app = express();

/**@database */
// function that connects to mongoDB via mongoose
connectDB();


/**@express @middleware => middleware functions that run during req and res */
// enable viewing json request in console
app.use(express.json());
// enables use of urlencoded key value pairs for constructing request
app.use(express.urlencoded({ extended: false }));
// custom error handler
app.use(Errors);
// allow cors
const corsOptions = {
    origin: ['http://localhost:3000', 'https://build-flatout007.vercel.app', 'https://build-mu-vert.vercel.app'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


/**@routes */
app.use("/albums", require("./routes/albums"));
app.use("/artists", require("./routes/artist"));
app.use("/tracks", require("./routes/tracks"));


app.listen(port, () => console.log("Server started, Bandcamp clone listening on port " + port));