const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    summary: String,
    content: {type: String, required: true},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deleted: {type: Boolean, default: false}
},{
    timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema)