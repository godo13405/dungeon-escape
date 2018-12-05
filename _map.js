'use strict';

const rooms = require('./config/rooms.json'),
      rwc = require('random-weighted-choice');

const mapper = {
  paths: ({
    level = saveFile && saveFile.map ? saveFile.map.level : 1,
    theme = saveFile && saveFile.map ? saveFile.map.theme : 'dungeon',
    location = saveFile && saveFile.location ? saveFile.location : 'stairs down'
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
      for (var i = 0; i < exits; i++) {
          paths.push(rwc(here.paths));
      }

      return paths;
    } else {
      console.log('Invalid location ', location);
    }
  },
  getDescription: (location) => {
    if (rooms[location]) {
      return rooms[location].description;
    } else {
      console.log('Invalid location ', location);
    }
  }
}

exports = module.exports = mapper;
