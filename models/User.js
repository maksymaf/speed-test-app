const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

    hashedPassword: {
        type: String,
        trim: true,
        required: true,
    },

    secretPassword: {
        type: String,
        trim: true,
        required: false,
    }
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;