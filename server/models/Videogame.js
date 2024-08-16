const { Schema, model } = require('mongoose');

const gameSchema = new Schema ({
    gameTitle: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 280,
        trim: true,
    },

    gameCompany: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 280,
        trim: true,
    },

    gameConsole: [{
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