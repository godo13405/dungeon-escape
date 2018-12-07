'use strict';

const monsters = require('./config/encounters/monsters.json');

const encounters = {
  new: ({
    level = 1,
    theme = "dungeon",
    thisRoom = saveFile.location.name
  }) => {
    let encounterLevel = Math.floor(Math.random() * (level + 1)) + (level - 1),
        enc = thisTheme.encounters[thisRoom],
        encLevel = 0,
        out = [];

    while (encLevel < saveFile.level + 1) {
      let mon = encounters.getMonster({
        monsters: enc
      });
      encLevel += mon.cr;
      out.push(mon);
    };
  },
  getMonster: ({
    minCR = 0,
    maxCR = saveFile.level + 1,
    monsters
  }) => {
    let encounterChance = [{"id": "none","weight": 100}];
    for (let x in  thisTheme.encounters) {
      encounterChance[0].weight -= thisTheme.encounters[x].chance;
      encounterChance.push({
        "id": x,
        "weight": thisTheme.encounters[x].odds
      });
    }
    console.log(encounterChance);
    let mon = rwc(encounterChance);
    return mon;
  }
};

exports = module.exports = encounters;
