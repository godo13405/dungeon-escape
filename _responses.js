'use strict';

const responses = {
  welcome: ({
    input = null,
    out = 'Hi, welcome to the wonderful world of Pokemon! Are you ready to choose your 1st Pokemon?',
    sugg = [
      'Yes, let\'s go!',
      'No, not yet'
    ]
  }) => {
    //check if it's the 1st time
    if (saveFile) {
      out = `Welcome back.<break time=\".4s\"/>
      Last we left off you and ${saveFile.party['1'].name} were going on adventure.<audio src=\"https://play.pokemonshowdown.com/audio/cries/${saveFile.party['1'].name}.mp3\"></audio>
      You are in ${saveFile.location.replace(/[-]/ig, ' ')}.<break time=\".4s\"/>
      Would you like to travel or have a look around?`;
      sugg = [
        'Travel',
        'Look around'
      ];
    }

    global.sugg = sugg;

    out = tools.setResponse({
      input:out,
      suggestions: sugg
    });

    return response.json(out);
  },
  travelExplore: ({
    input = null,
    out = sak.i18n(i18n.activity.explore.fail),
    sugg = global.sugg
  }) => {
    console.log(out);
    if (location.pokemon_encounters) {
      console.log(location.pokemon_encounters);
    }

    out = tools.setResponse({
      input:out,
      suggestions: sugg
    });

    return response.json(out);
  },
  travelMove: ({
    input = null
  }) => {
    let out = "You can go to ",
        sugg = [];
    if (gameMap[saveFile.location].adjacent) {
      let adj = [],
          adjLoc;
      for (var x in gameMap[saveFile.location].adjacent) {
        if (gameMap[saveFile.location].adjacent.hasOwnProperty(x)) {
          adjLoc = x;
          if (x['leads-to']) {
            adjLoc = x + ' which leads to ' + x['leads-to'];
          }
          adj.push(adjLoc);
        }
      }
      adj[adj.length - 1] = 'or ' + adj[adj.length - 1];
      adj = adj.join(', ');
      out = out + adj;
    }

    out = tools.setResponse({
      input:out,
      suggestions: sugg
    });

    return response.json(out);
  },
  confirmStarter: ({
    input = null
  }) => {
    let pkmn = sak.getContext('defaultwelcomeintent-yes-custom-followup');
    global.saveFile = {
      party: {
        1: {
          name: pkmn,
          level: 5
        }
      }
    };
    let out = `<speech>Great, ${pkmn} will be your buddy.<audio src="https://play.pokemonshowdown.com/audio/cries/${pkmn}.mp3"></audio></speech>`;

    out = tools.setResponse({input:out});

    return response.json(out);
  }
};

exports = module.exports = responses;
