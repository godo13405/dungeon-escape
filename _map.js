'use strict';

const rooms = require('./config/rooms.json'),
      directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const mapper = {
  generate: ({
    level = 1,
    theme = 'dungeon',
    start = 'stairs',
    size = 10
  }) => {
    // create the base matrix
    let mat = [];
    for (let i = 0; i < size; i++) {
      mat.push([]);
      for (let k = 0; k < size; k++) {
        mat[i].push('');
      }
    }

    // pick a starting point
    let here = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
    mat[here[0], here[1]] = start;

    //random walk
    let lastDirection = [];

    for (let i = 0; i < 80; i++) {
      let go = mapper.randomDirection();
      if (mat[here[0] + go[0]][here[1] + go[1]] === '') {
        here = [here[0] + go[0], here[1] + go[1]];
        mat[here[0]][here[1]] = mapper.randomRoom();
      }
    }

    console.table(mat);
  },
  randomDirection: () => {
    return directions[Math.floor(Math.random() * directions.length)];
  },
  randomRoom: () => {
    let roomTypes = Object.keys(rooms);
    return roomTypes[Math.floor(Math.random() * roomTypes.length)];
  },
  getMapAdjacent: ({}) => {

  }
}

exports = module.exports = mapper;
