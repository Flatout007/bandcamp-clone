
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        // console.log(`Your ${conn.connection.host} Connected to MongoDB`.cyan.underline);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;