// External Dependencies
const mongoose = require('mongoose');

// User Model
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    }
},
{
    timestamps: true
});

// Export Model
module.exports = mongoose.model('Comment', commentSchema);