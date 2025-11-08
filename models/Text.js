const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema({
    value: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
}, {timestamps: true});

const Text = mongoose.model('Text', TextSchema);

module.exports = Text;