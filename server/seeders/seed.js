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

    await cleanDB('Game', 'games');

    // await User.create(userSeeds);

    const games = await Game.create(gameSeeds);


    // function getRandomGames(gameArray, numGames) {
    //   const shuffled = gameArray.sort(() => Math.random() -0.5 );
    //   return shuffled.slice(0, numGames);
    // }
    
    // for (let i = 0; i < postSeeds.length; i++) {

    //   const postSeed = postSeeds[i];

    //   // Get a random number of games (between 1 and the total number of games)
    //   const randomGames = getRandomGames(games, Math.floor(Math.random() * 9) + 2);

    //   // Populate the gameList with the selected random games' ObjectId references
    //   postSeed.games = randomGames.map(game => game._id);


    //   const { _id, author } = await Post.create(postSeed);
    //   const user = await User.findOneAndUpdate(
    //     { username: author },
    //     {
    //       $addToSet: {
    //         posts: _id,
    //       },
    //     }
    //   );
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
