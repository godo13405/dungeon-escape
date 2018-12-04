'use strict';

const tools = {
  setResponse: ({
    input = null,
    suggestions = [],
    pause = 5,
    followUp = true,
    source = global.source,
    capabilities = global.capabilities,
    context = null,
    clearStorage = false,
    conversationEnd = false
  }) => {
    let output,
      speak = !capabilities.includes('screen') && capabilities.includes('audio');
    if (input) {
      if (typeof input === 'string') {
        input = {
          speech: input
        };
      }

      // get rid of leading and trailing whitespaces
      if(input.text) input.text = input.text.trim();
      if(input.speech) input.speech = input.speech.trim();

      // check if the text is too big to output
      // if there's also a card, the text should be trimmed
      if (input.card && input.text && input.text.length > 200) {
        input.trimText = input.text.substr(0, 199) + '...';
      }

      // if it doesn't have a screen, read out the suggestions
      if (suggestions.length && speak) {
        input.speech = `${input.speech}.<break time='${pause}s'/>${suggestions}`;
      }
      // no text? take the speech
      if (!input.text && input.speech)
        input.text = sak.clearSpeech(input.speech).trim();
      // no speech? take the text
      if (!input.speech && input.text)
        input.speech = input.text;

      output = {
        fulfillmentText: '',
        fulfillmentMessages: [],
        payload: {}
      };

      let speech = `<speech>${sak.cleanText(input.speech)}</speech>`;

      if (source === 'web') {
        output.fulfillmentText = speak ? speech : sak.formatText(input.text, 'web');
        output.payload.fulfillmentSpeech = speech;
        if (!speak && suggestions.length && capabilities.includes('screen')) {
          output.payload.suggestions = suggestions;
        }
      } else if (source === 'google') {
        output.payload = {
          google: {
            userStorage: JSON.stringify(saveFile),
            expectUserResponse: !conversationEnd,
            is_ssml: true,
            richResponse: {
              items: [{
                simpleResponse: {
                  textToSpeech: speech,
                  displayText: sak.cleanText(sak.clearSpeech(input.trimText ? input.trimText : input.text))
                }
              }]
            }
          }
        };
        if (clearStorage) {
          output.payload.google.resetUserStorage = true;
        }
        if (suggestions.length && capabilities.includes('screen')) {
          output.payload.google.richResponse.suggestions = [];
          for (var i = 0; i < suggestions.length; i++) {
            output.payload.google.richResponse.suggestions.push({
              title: suggestions[i]
            });
          }
        }
      } else if (source === 'alexa') {
        output.payload = {
          alexa: {
            text: sak.formatText(input.text, 'alexa'),
            SSML: speech
          }
        };
      } else if (source === 'slack') {
        output.payload = {
          slack: {
            text: sak.formatText(input.text, 'slack')
          }
        };
      }
      if (input.card) {
        output = tools.buildCard(output, input.card);
      }

      // Contexts
      if (context) {
        let c = request.body.queryResult.outputContexts[0].name;
        c = c.substr(0, c.lastIndexOf("/"));

        for (let x of context) {
          let newContext = {
            name: c + x.name,
          };
          if (x.lifespan) newContext.lifespanCount = x.lifespan;
          if (x.parameters) newContext.parameters = x.parameters;
          request.body.queryResult.outputContexts.push(newContext);
        }
      }

      if (!process.env.SILENT) console.log("\x1b[32m", speak ? speech : input.text, "\x1b[0m");
    }
    if (!process.env.SILENT && process.env.DEBUG) console.timeEnd('total response time');

    // tools.save();

    return output;
  },
  save: (file) => {
    if (userId)
      db.ref('users/' + userId).set(saveFile);
  },
  areaEncounters: (area) => {
    let e = area.pokemon_encounters,
        out = {};
    for (var x in e) {
      if (e.hasOwnProperty(x)) {

      }
    }

    return out;
  }
}

exports = module.exports = tools;
