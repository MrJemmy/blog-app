const express = require('express')
const cors = require('cors')
require("dotenv").config()

const connectDB = require("./connect")
const userRouter = require("./src/routes/user")
const blogRouter = require("./src/routes/blog")


const app = express()
const PORT = process.env.PORT || 8000;

// for browsers cors policy
// app.use(cors())
app.use(express.json())
app.use("/", blogRouter);
app.use("/user", userRouter);

app.get('/test', (req, res) => {
    res.json({
        msg: "test complate, server is running"
    })
})



const start =  async() => {
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => {
            console.log(`app start on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
};
start();