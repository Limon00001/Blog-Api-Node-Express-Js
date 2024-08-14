// External Dependencies
const mongoose = require('mongoose');

// User Model
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
        required: true,
    }
},
{
    timestamps: true
});

// Export Model
module.exports = mongoose.model('Category', categorySchema);