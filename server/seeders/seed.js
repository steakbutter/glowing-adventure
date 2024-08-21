const db = require('../config/connection');
const { User, Post, Game } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const gameSeeds = require('./gameSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Post', 'posts');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    await Game.create(gameSeeds);
    
    for (let i = 0; i < postSeeds.length; i++) {
      const { _id, author } = await Post.create(postSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: author },
        {
          $addToSet: {
            posts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
