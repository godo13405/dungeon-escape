'use strict';

const rooms = require('./config/rooms.json'),
      rwc = require('random-weighted-choice');

const mapper = {
  paths: ({
    level = saveFile && saveFile.map ? saveFile.map.level : 1,
    theme = saveFile && saveFile.map ? saveFile.map.theme : 'dungeon',
    location = saveFile && saveFile.location && saveFile.location.name ? saveFile.location.name : 'stairs down'
  }) => {
    let here = rooms[location],
        paths = [],
        exits;
    if (here) {
      // how many exits does this room have?
      if (Array.isArray(here.exits)) {
        exits = Math.floor(Math.random() * ((here.exits[1] + 1) - here.exits[0])) + here.exits[0];
      } else {
        exits = here.exits;
      }

      // check we don't have more exits than we can chew (so rooms don't repeat)
      if (exits > here.paths.length - 1) {
        exits = here.paths.length - 1;
      }

      for (var i = 0; i < exits; i++) {
          let roo = rwc(here.paths);
          while (paths.find((r) => {r.id === roo.id})) {
            roo = rwc(here.paths);
          }
          paths.push(roo);
      }

      return paths;
    } else {
      console.log('Invalid location ', location.name);
    }
  },
  getDescription: (location) => {
    if (rooms[location]) {
      return rooms[location].description;
    } else {
      console.log('Invalid location ', location.name);
    }
  }
}

exports = module.exports = mapper;
