'use strict';




const Project = require('../server/models/project')









// Messenger API integration example
// We assume you have:
// * a Wit.ai bot setup (https://wit.ai/docs/quickstart)
// * a Messenger Platform setup (https://developers.facebook.com/docs/messenger-platform/quickstart)
// You need to `npm install` the following dependencies: body-parser, express, request.
//
// 1. npm install body-parser express request
// 2. Download and install ngrok from https://ngrok.com/download
// 3. ./ngrok http 8445
// 4. WIT_TOKEN=your_access_token FB_APP_SECRET=your_app_secret FB_PAGE_TOKEN=your_page_token node examples/messenger.js
// 5. Subscribe your page to the Webhooks using verify_token and `https://<your_ngrok_io>/webhook` as callback URL.
// 6. Talk to your bot on Messenger!

const bodyParser = require('body-parser');
const crypto = require('crypto');
const express = require('express');
const fetch = require('node-fetch');
const request = require('request');

let Wit = null;
let log = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  log = require('../').log;
} catch (e) {
  Wit = require('node-wit').Wit;
  log = require('node-wit').log;
}

// Webserver parameter
const PORT = process.env.PORT || 8445;

// Wit.ai parameters
const WIT_TOKEN = "47AZU73QCRMK4XOAKEFIW4OTWLLVIA22";

// Messenger API parameters
const FB_PAGE_TOKEN = "EAAZAtWUdZCi5YBAPfyZAALW9FItLx1J1pmDWLiZARYgKy5RsbWUk2kTO46ti9ulB1A2Azh0IPpu6ZAw5KazsCP23R87ZB1UVjTBZABXho0yOJmisfOULcQ4ZAH1ZCApoLKQVdNxtyqw6GYZA6Mx6op24J0VPiZCGppnC9FZAOCsRxPKouwZDZD";
if (!FB_PAGE_TOKEN) { throw new Error('missing FB_PAGE_TOKEN') }
const FB_APP_SECRET = "db9f67e111be93022096f0212cf7f370";
if (!FB_APP_SECRET) { throw new Error('missing FB_APP_SECRET') }

let FB_VERIFY_TOKEN = "my_voice_is_my_password_verify_me";
crypto.randomBytes(8, (err, buff) => {
  if (err) throw err;
  FB_VERIFY_TOKEN = buff.toString('hex');
  console.log(`/webhook will accept the Verify Token "${FB_VERIFY_TOKEN}"`);
});

// ----------------------------------------------------------------------------
// Messenger API specific code

// See the Send API reference
// https://developers.facebook.com/docs/messenger-platform/send-api-reference

// const fbMessage = (sender, text) => {
//   // const body = JSON.stringify({
//   //   recipient: { id },
//   //   message: { text },
//   // });
//   const messageData = {
//     recipient: sender,
//     text: text
//   }
//   const qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);

//   return fetch('https://graph.facebook.com/me/messages?' + qs, {
//     method: 'POST',
//     // headers: {'Content-Type': 'application/json'},
//     json: {
//       recipient: {id: sender},
//       message: messageData,
//     }
//   })
//   .then(rsp => rsp.json())
//   .then(json => {
//     console.log("JSNJSNSJNSJNSJNS", json)
//     if (json.error && json.error.message) {
//       throw new Error(json.error.message);
//     }
//     return json;
//   });
// };

const fbMessage = (id, text) => {
  const body = JSON.stringify({
    recipient: { id: id },
    message: { text },
  });
  const qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);
  return fetch('https://graph.facebook.com/me/messages?' + qs, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body,
  })
  .then(rsp => rsp.json())
  // .then(rsp => {
    // return rsp
  .then(json => {
  //   console.log("JSJONSJSONSJSONSJONS", json)
  //   if (json.error && json.error.message) {
  //     throw new Error(json.error.message);
  //   }
    return json;
  });
};

// ----------------------------------------------------------------------------
// Wit.ai bot specific code

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {fbid: facebookUserId, context: sessionState}
const sessions = {};

const findOrCreateSession = (fbid) => {
  let sessionId;
  // Let's see if we already have a session for the user fbid
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      // Yep, got it!
      sessionId = k;
    }
  });
  if (!sessionId) {
    // No session found for user fbid, let's create a new one
    sessionId = new Date().toISOString();
    sessions[sessionId] = {fbid: fbid, context: {}};
  }
  return sessionId;
};

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

// const secondEntityValue = (entities, entity) => {
//   console.log("ENTITIES", entities)
//   console.log("ENTITYentity", entity)
//   const val = entities && entities[entity] &&
//     Array.isArray(entities[entity]) &&
//     entities[entity].length > 1 &&
//     entities[entity][1].value
//   ;
//   if (!val) {
//     return null;
//   }
//   return typeof val === 'object' ? val.value : val;
// };

// Our bot actions
const actions = {
  send({sessionId}, {text}) {
    console.log("SESSION IDDDDDD", sessions[sessionId])
    // Our bot has something to say!
    // Let's retrieve the Facebook user whose session belongs to
    const recipientId = sessions[sessionId].fbid;
    if (recipientId) {
      // Yay, we found our recipient!
      // Let's forward our bot response to her.
      // We return a promise to let our bot know when we're done sending
      return fbMessage(recipientId, text)
      .then(() => null)
      .catch((err) => {
        console.error(
          'Oops! An error occurred while forwarding the response to',
          recipientId,
          ':',
          err.stack || err
        );
      });
    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      // Giving the wheel back to our bot
      return Promise.resolve()
    }
  },
  // You should implement your custom actions here
  // See https://wit.ai/docs/quickstart
  // send(request, response) {
  //     console.log("REQUEST", request)
  //     console.log("RESPONSE", response)
  //     const {sessionId, context, entities} = request;
  //     const {text, quickreplies} = response;
  //     const recipientId = sessions[sessionId].fbid

  //     // return new Promise(function(resolve, reject) {
  //       if (recipientId) {
  //       console.log('sending...', JSON.stringify(response));
  //       return fbMessage(recipientId, text)
  //       then(() => null)
  //             .catch((err) => {
  //               console.error(
  //                 'Oops! An error occurred while forwarding the response to',
  //                 recipientId,
  //                 ':',
  //                 err.stack || err
  //               );
  //             });
  //           } else {
  //             console.error('Oops! Couldn\'t find user for session:', sessionId);
  //             // Giving the wheel back to our bot
  //             return Promise.resolve()
  //           }
  //       // return resolve();
  //     // });
  //   },
    getSkill({context, entities}) {
      return new Promise(function(resolve, reject) {
        const userSkill = firstEntityValue(entities, 'skill');
        context.skill = userSkill;
        



        const projectList = Project.all()
          .then(function(response) {
            return response.filter(function (project) {
              return project.req_skills.indexOf(userSkill) >= 0
            })
          })
          .then(function (goodProj) {
            // console.log("goodProj", goodProj)
            // console.log("context", context)
            // console.log("promise context", Promise.resolve(context));
            // const stringifiedProj = JSON.stringify(goodProj);
            // console.log("HERHERHERHERHERHERH", stringifiedProj)
            // // return fbMessage(sender, stringifiedProj)
            // // const results = secondEntityValue(entities, 'results')
            context.results = JSON.stringify(goodProj)
          })
          .then(function (res) {
            // // context.results = res
            // console.log("contextCONTEXT", context)
            // context.results = res
            console.log("CONTEXT . RESULTS", context.results)
            return resolve(context)
          })
          // .then (function (res) {
          //   return fbMessage(sender, res)
          // })
      })
    }
};

  // send(request, response) {
  //   const {sessionId, context, entities} = request;
  //   const {text, quickreplies} = response;
  //   return new Promise(function(resolve, reject) {
  //       console.log('user said...', request.text);
  //       console.log('sending...', JSON.stringify(response));
  //       return resolve();
  //   });
  // },
 //  ['compute-result']({context,entities}) {
 //    return new Promise(function(resolve, reject) {
 //      const movie_title = firstEntityValue(entities, 'movie');
 //      if (movie_title) {
 //        context.movie = movie_title;
 //      }
 //      //call the API here
 //      return resolve(context);
 //  });
 // },










  // Project.all().then(function(response) {
  // console.log('FUR YEA', response)
  // })




// };

// Setting up our bot
const wit = new Wit({
  accessToken: WIT_TOKEN,
  actions,
  logger: new log.Logger(log.INFO)
});

// Starting our webserver and putting it all together
const app = express();
app.use(({method, url}, rsp, next) => {
  rsp.on('finish', () => {
    console.log(`${rsp.statusCode} ${method} ${url}`);

  });
  next();
});

app.use(bodyParser.json({ verify: verifyRequestSignature }));

// Webhook setup
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

// Message handler
app.post('/webhook', (req, res) => {
  // Parse the Messenger payload
  // See the Webhook reference
  // https://developers.facebook.com/docs/messenger-platform/webhook-reference
  const data = req.body;

  if (data.object === 'page') {
    data.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message) {
          // Yay! We got a new message!
          // We retrieve the Facebook user ID of the sender
          const sender = event.sender.id;

          // We retrieve the user's current session, or create one if it doesn't exist
          // This is needed for our bot to figure out the conversation history
          const sessionId = findOrCreateSession(sender);

          // We retrieve the message content
          const {text, attachments} = event.message;

          if (attachments) {
            // We received an attachment
            // Let's reply with an automatic message
            fbMessage(sender, 'Sorry I can only process text messages for now.')
            .catch(console.error);
          } else if (text) {
            // We received a text message

            // Let's forward the message to the Wit.ai Bot Engine
            // This will run all actions until our bot has nothing left to do
            wit.runActions(
              sessionId, // the user's current session
              text, // the user's message
              sessions[sessionId].context // the user's current session state
            ).then((context) => {
              // Our bot did everything it has to do.
              // Now it's waiting for further messages to proceed.
              console.log('Waiting for next user messages');

              // Based on the session state, you might want to reset the session.
              // This depends heavily on the business logic of your bot.
              // Example:
              // if (context['done']) {
              //   delete sessions[sessionId];
              // }

              // Updating the user's current session state
              sessions[sessionId].context = context;
            })
            .catch((err) => {
              console.error('Oops! Got an error from Wit: ', err.stack || err);
            })
          }
        } else {
          console.log('received event', JSON.stringify(event));
        }
      });
    });
  }
  res.sendStatus(200);
});

/*
 * Verify that the callback came from Facebook. Using the App Secret from
 * the App Dashboard, we can verify the signature that is sent with each
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    // For testing, let's log an error. In production, you should throw an
    // error.
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', FB_APP_SECRET)
                        .update(buf)
                        .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

app.listen(PORT);
console.log('Listening on :' + PORT + '...');