const monogose = require("mongoose")

const connectDB = () => {
    console.log("database connected")
    return monogose.connect(process.env.MONGODB_URL);
}

module.exports = connectDB;