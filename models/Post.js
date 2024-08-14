// External Dependencies
const mongoose = require('mongoose');

// User Model
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
},
{
    timestamps: true
});

// Export Model
module.exports = mongoose.model('Post', postSchema);