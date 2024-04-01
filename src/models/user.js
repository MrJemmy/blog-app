const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 4,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        // blogsCount:{
        //     type: Number,
        //     default: 0
        // },
        // type:{
        //     type: String,
        //     enum: {
        //         values: ["admin", "bloger"],
        //         message: `{VALUE} is not supported.`
        //     },
        //     default: "bloger",
        //     required: true
        // }
    },{
        timestamps: true
    }
)


module.exports = mongoose.model('User', userSchema)