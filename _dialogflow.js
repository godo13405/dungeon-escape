const DialogflowApp = require('actions-on-google').DialogflowApp;
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const welcome = (app) => {
    if (!app.userStorage.visited) {
      app.ask(`Welcome to my action! You can write a longer intro here.`)
      app.userStorage.visited = true;
    } else {
      app.ask(`Welcome, how may I help?`);
    }
  }
const app = new DialogflowApp({request, response});
  const actions = new Map();
  actions.set('welcome', welcome);
  app.handleRequest(actions);
});
