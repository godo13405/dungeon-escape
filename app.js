'use strict';

if (process.env.SILENT) process.env.DEBUG = false;

global.express = require('express');
let compression = require('compression');
global.bodyParser = require('body-parser');
global.capabilities = process.env.CAPABILITIES ? [process.env.CAPABILITIES] : ['audio', 'screen'];
global.i18n = require('./config/lang/en.json');
global.ex = express();

global.params = {};
global.sugg = [];

global.service = require('./service');

global.saveFile = null;
global.location = null;

const webhook = (request, response) => {
  if (!process.env.SILENT && process.env.DEBUG) console.time('total response time');
  if (request.body.queryResult) {
    if (!process.env.SILENT) console.log("\x1b[36m", request.body.queryResult.queryText, "\x1b[2m", request.body.queryResult.action, "\x1b[0m");
  }
  global.request = request;
  global.response = response;
  global.actionArr = request.body.queryResult.action.split(".");
  global.context = request.body.queryResult.outputContexts;
  global.collection = actionArr[0];
  global.intention = actionArr[actionArr.length - 1];
  global.source = request.body.originalDetectIntentRequest.source || 'web';
  global.userId = request.body.user ? request.body.user.userId : null;
  global.params = request.body.queryResult.parameters;

  if (request.body.originalDetectIntentRequest.payload.user.userStorage) {
    global.saveFile = JSON.parse(request.body.originalDetectIntentRequest.payload.user.userStorage);
  }

  if (saveFile && saveFile.class) {
    global.pcClass = require("./config/PC/classes.json");
    pcClass = pcClass[saveFile.class];
  }

  // Get surface capabilities, such as screen
  capabilities = service.setCapabilities(request.body.originalDetectIntentRequest);

  //direct intents to proper functions
  return service.router(request.body.queryResult.action, actionArr[1]);
};

global.sak = require('./_swiss-army-knife');
global.rwc = require('random-weighted-choice');
global.monsters = require('./config/encounters/monsters.json');
let themes = require('./config/themes.json');
global.thisTheme = themes[(saveFile && saveFile.map.theme) ? saveFile.map.theme : 'dungeon'];
global.mapper = require('./_map');
global.encounters = require('./_encounters');
global.tools = require('./_tools');
global.responses = require('./_responses');

process.env.GOOGLE_APPLICATION_CREDENTIALS = process.env.google_application_credentials;

ex.use(bodyParser.json());
ex.use(compression(6))
// ex.use(express.static('./www'));
ex.post('/', webhook);
let port = process.env.PORT || 3000;
ex.listen(port, () => {
  if (!process.env.SILENT) console.log('Dungeon is ready on port ' + port);
});

exports.webhook = webhook;
