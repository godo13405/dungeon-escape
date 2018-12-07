'use strict';

const service = {
  router: (input, midIntention) => {
    // encounter trigger
    let encounterTriggers = require('./config/encounters/triggers.json');
    if (encounterTriggers.include(input)) {
      
    }

    if (responses[input]) {
      return responses[input]({input});
    } else {
      console.log('Can\'t find this response');
    }
    return false;
  },
  setCapabilities: input => {
    let output = input;
    if (input && input.source) {
      // Get surface capabilities, such as screen
      switch (input.source) {
        case ('web'):
          output = input.capabilities;
          break;
        case ('google'):
          output = [];
          input.payload.surface.capabilities.forEach(cap => {
            if (cap.name) {
              cap = cap.name.split('.');
              cap = cap[cap.length - 1].replace(/_OUTPUT/g, '').toLowerCase();
              output.push(cap);
            }
          });
          break;
        case ('alexa'):
          output = ['audio'];
      }
    } else {
      output = global.capabilities;
    }
    return output;
  }
};
exports = module.exports = service;
