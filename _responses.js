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
      out = `Welcome back ${saveFile.class}.<break time=\".4s\"/>
Last we left off you were in a ${saveFile.location.name || 'cell'}.<break time=\".4s\"/>
Would you like to travel or have a look around?`;
      sugg = [
        'Travel',
        'Look around'
      ];
    } else {
      out = 'Hi, welcome to the Dungeon. Before you start your daring escape, is it ok if I keep track of your progress? That way you can pick up where you left off next time.';
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
  deleteGame: ({
    input = null
  }) => {
    return responses.trackingNo({input});
  },
  trackingNo: ({
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
    out = sak.i18n(i18n.activity.travel.getDirections),
    sugg = ['Look around']
  }) => {
    let exits = tools.getExits({sugg,out});
    out = tools.setResponse({
      input:out + exits.paths,
      suggestions: exits.sugg
    });

    return response.json(out);
  },
  travelMove: ({
    input = null,
    sugg = [],
    saveFile = global.saveFile
  }) => {
    saveFile.location = {
      "name": params.Room,
      "adjacent": mapper.paths({})
    };
    let exits = tools.getExits({lastPre: 'or'}),
        out = tools.setResponse({
          input: `${sak.i18n(i18n.activity.travel.move)} the ${saveFile.location.name}. You can now have a look around or go to ${exits.paths}`,
          suggestions: exits.sugg.concat(sugg)
        });

    return response.json(out);
  },
  exploreLookAround: ({
    input = null,
    saveFile = global.saveFile
  }) => {
    let out = mapper.getDescription(saveFile.location),
        exits = tools.getExits({});
    out = tools.setResponse({
      input:out + " " + exits.paths,
      suggestions: exits.sugg
    });

    return response.json(out);
  },
  pickClass: ({
    input = null,
    sugg = ['Travel', 'Look around']
  }) => {
    global.saveFile = {
      class: params.Class,
      level: 1,
      location: {
        "name": 'cell',
        adjacent: [
          "corridor"
        ]
      },
      map: {
        level: 1,
        theme: 'dungeon'
      }
    };
    let out = `Ok then, great ${params.Class}, let's begin your escape. You are in a ${saveFile.location.name}, ${sak.lowerCaseLetter({input: mapper.getDescription(saveFile.location.name)})}`,
        exits = tools.getExits({sugg: []});
    out = tools.setResponse({
      input:out + " " + exits.paths,
      suggestions: exits.sugg.concat(sugg)
    });

    return response.json(out);
  }
};

exports = module.exports = responses;
