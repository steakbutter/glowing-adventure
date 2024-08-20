const { Schema, model } = require('mongoose');

const gameSchema = new Schema ({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 280,
        trim: true,
    },

    company: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 280,
        trim: true,
    },

    console: [{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 280,
        trim: true,
    }
    ]
});

const Game = model('Game', gameSchema);

module.exports = Game;