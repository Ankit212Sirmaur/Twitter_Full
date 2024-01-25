const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: {
        type:String,
        trim: true,
        required: true,
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        pinned: Boolean,
    },
    
}, { timestamps: true })


let tweet = mongoose.model('Tweet', postSchema);
module.exports = tweet;