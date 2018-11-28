'use strict';

const responses = {
  listStarter: ({
    input = null
  }) => {
    console.log(global.params);
    let out = tools.setResponse({
      input: {
        speech: 'Great! You can choose Squirtle, the water turtle<audio src="https://play.pokemonshowdown.com/audio/cries/squirtle.mp3"></audio><break time=".4s"/> Charmander, the fire lizard<audio src="https://play.pokemonshowdown.com/audio/cries/charmander.mp3"></audio><break time=".4s"/> or Bulbasaur, the plant toad<audio src="https://play.pokemonshowdown.com/audio/cries/bulbasaur.mp3"></audio><break time="1s"/>Which will you take on your adventure?'
      }
    });

    return response.json(out);
  }
};

exports = module.exports = responses;
