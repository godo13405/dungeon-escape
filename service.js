'use strict';

const service = {
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
  },
  router: (input, midIntention) => {
    switch (input) {
      case 'input.welcome':
        return responses.welcome({input});
      case 'firstTime.PickStarter.confirm':
        return responses.confirmStarter({input});
    }
    return false;
  }
};
exports = module.exports = service;
