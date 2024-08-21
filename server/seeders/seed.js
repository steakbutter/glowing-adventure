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

    const games = await Game.create(gameSeeds);


    function getRandomGames(gameArray, numGames) {
      const shuffled = gameArray.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, numGames);
    }
    
    for (let i = 0; i < postSeeds.length; i++) {

      const postSeed = postSeeds[i];

      // Get a random number of games (between 1 and the total number of games)
      const randomGames = getRandomGames(games, 2);
      
      console.log(randomGames);

      // Populate the gameList with the selected random games' ObjectId references
      postSeed.games = randomGames.map(game => game._id);


      const { _id, author } = await Post.create(postSeeds);
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
