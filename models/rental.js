var mongoose = require('mongoose');

// SCHEMA SETUP FOR My Rental Schema
var rentalSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    name: String,
    image: String,
    description: String,
    location: String,
    lat: Number,
    lng: Number,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model('Rental', rentalSchema);