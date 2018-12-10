'use strict';

const encounters = {
  new: ({
    level = saveFile.level ? saveFile.level : 1,
    theme = "dungeon",
    thisRoom = saveFile.location.name
  }) => {
    console.log("Encounter trigered!");
    let encounterLevel = Math.floor(Math.random() * (level + 1)) + (level - 1),
        enc = thisTheme.encounters[thisRoom],
        encLevel = 0,
        out = [];

    encounterLevel = encounterLevel > 0 ? encounterLevel : 1;

    return encounters.getMonster({
      maxCR: encounterLevel,
      thisRoom,
      monsters: enc
    });
  },
  getMonster: ({
    minCR = 0,
    maxCR = saveFile.level + 1,
    thisRoom = global.thisRoom,
    monsters
  }) => {
    let mon = thisTheme.encounters[thisRoom].monsters;
    mon.filter(x => {
      x.cr <= maxCR && x.cr >= minCR;
    });
    console.log(thisRoom);
    let encounterChance = tools.getWeightedChance({
      odds: thisTheme.encounters[thisRoom].odds,
      arr: mon
    });
    return rwc(encounterChance);
  }
};

exports = module.exports = encounters;
