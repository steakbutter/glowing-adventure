const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  text: {
    type: String,
    required: 'You need to leave a post!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },

  gameList:[ 
    {
      type: Schema.Types.ObjectId,
      ref: 'Game',
    },
  ],
  author: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Post = model('Post', postSchema);

module.exports = Post;
