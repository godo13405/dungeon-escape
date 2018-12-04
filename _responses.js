'use strict';

const responses = {
  welcome: ({
    input = null,
    out = 'Hi, welcome to the wonderful world of Pokemon! Are you ready to choose your 1st Pokemon?',
    sugg = [
      'Yes, let\'s go!',
      'No, not yet'
    ],
    context = null
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
    } else {
      out = 'Hi, welcome to the wonderful world of Pokemon! Before we start, is it ok if I keep track of your progress? That way you can pick up where you left off next time.';
      sugg = [
        'Yes, keep my save file.',
        'No, don\'t track my data'
      ];
    }

    global.sugg = sugg;

    out = tools.setResponse({
      input:out,
      suggestions: sugg,
      context
    });

    return response.json(out);
  },
  noTracking: ({
    input = null,
    out = 'Ok, I\'m not recording anything. Come back if you change your mind.'
  }) => {
    global.saveFile = null;
      out = tools.setResponse({
        input:out,
        clearStorage: true,
        conversationEnd: true
      });

      return response.json(out);
  },
  travelGrind: ({
    input = null,
    out = sak.i18n(i18n.activity.explore.fail),
    sugg = global.sugg
  }) => {
    if (location.pokemon_encounters) {
      console.log(location.pokemon_encounters);
    }

    out = tools.setResponse({
      input:out,
      suggestions: sugg
    });

    return response.json(out);
  },
  travelGetDirections: ({
    input = null,
    out = "You can go to ",
    sugg = ['Look around']
  }) => {
    let coord = sak.searchInMatrix({
      search: saveFile.location
    });

    let adj = sak.adjacent({coord});
    if (adj && adj.length) {
      sugg = adj.concat(sugg);

      let adjLast = adj[adj.length - 1];
      adj.pop();
      adj = adj.join(', ') + ' or ' + adjLast;

      out = out + adj;
    }

    out = tools.setResponse({
      input:out,
      suggestions: sugg
    });

    return response.json(out);
  },
  travelMove: ({
    input = null,
    saveFile = global.saveFile
  }) => {
    saveFile.location = params.location.toLowerCase().replace(/\s/, '-');
    responses.travelGetDirections({
      input,
      out: `You\'ve arrived in ${saveFile.location}. You can now have a look around or go to `
    });
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
    let out = `<speech> Great, ${pkmn} will be your buddy.<audio src="https://play.pokemonshowdown.com/audio/cries/${pkmn}.mp3"></audio></speech>`;

    out = tools.setResponse({input:out});

    return response.json(out);
  }
};

exports = module.exports = responses;
