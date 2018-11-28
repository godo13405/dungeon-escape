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
      case 'firstTime.listStarter':
      console.log(responses);
        return responses.listStarter(input);
    switch (input) {
      case 'firstTime.pickStarter':
        return responses.pickStarter();
    }
    return false;
  }
}};
exports = module.exports = service;
