var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var fetch = require('node-fetch')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})


// Wit.ai parameters
var WIT_TOKEN = "OYZAK6OU46FUO7UCPWG2KZ27VRIFN5UB"

var Wit = require('node-wit');


// let Wit = null;
// let log = null;
// try {
//   // if running from repo
//   Wit = require('../').Wit;
//   log = require('../').log;
// } catch (e) {
//   Wit = require('node-wit').Wit;
//   log = require('node-wit').log;
// }




// // Spin up the server
// app.listen(app.get('port'), function() {
//     console.log('running on port', app.get('port'))
// })



// var token = "EAADF9ay2h5gBAOvwyJAFpwqG9y3Wg3Q4JWZAfpVgDXNKrvwfObIUbq7ZCbNERuuPdMLy6cGoanbryqx6XEcF9tWnkGA7ZAwHJo9LUFCplndhA1Kw8c1NjaS49vHjjjhebzCw7PiWUsNVa0bxOQ4BQKqLsbCLIWiZC8GR7FZAKlAZDZD"



// Messenger API parameters
// var FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN;
var FB_PAGE_TOKEN = "EAADF9ay2h5gBAMILN6OuwRvUhr1c6hxQ0ZCIbxi5VTfdZAXDHBDjsYDqKdHKIkozkAZAoM2T4o3SuxrOdl2CifgKaV4g7vaIQUZCKgWxEcaatEW567ml0jladWnNTKGrvPVzKp32v9WOdW6NJSlPRjtZCSkVvwd2W7SYb3V7feAZDZD";
if (!FB_PAGE_TOKEN) { throw new Error('missing FB_PAGE_TOKEN') }
// // var FB_APP_SECRET = process.env.FB_APP_SECRET;
// var FB_APP_SECRET = "cc5f2d797b549fc1e8cc7780c9b5a2c2";
// if (!FB_APP_SECRET) { throw new Error('missing FB_APP_SECRET') }


var FB_VERIFY_TOKEN = "my_voice_is_my_password_verify_me";
// crypto.randomBytes(8, (err, buff) => {
//   if (err) throw err;
//   FB_VERIFY_TOKEN = buff.toString('hex');
//   console.log(`/webhook will accept the Verify Token "${FB_VERIFY_TOKEN}"`);
// });


// Messenger API specific code

// See the Send API reference
// https://developers.facebook.com/docs/messenger-platform/send-api-reference

var fbMessage = (id, text) => {
  var body = JSON.stringify({
    recipient: { id },
    message: { text },
  });
  var qs = 'access_token=' + FB_PAGE_TOKEN;
  return fetch('https://graph.facebook.com/me/messages?' + qs, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body,
  })
  .then(rsp => rsp.json())
  .then(json => {
    if (json.error && json.error.message) {
      throw new Error(json.error.message);
    }
    return json;
  });
};

////////////////////////////////////////////////////////
// Wit.ai bot specific code

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {fbid: facebookUserId, context: sessionState}
var actions = {
  send(request, response) {
    var (sessionId, context, entities) = request;
    var (text, quickreplies) = response;
    return new Promise(function(resolve, reject) {
        console.log('user said...', request.text);
        console.log('sending...', JSON.stringify(response));
        return resolve();
    });
  },
  ['compute-result']({context,entities}) {
    return new Promise(function(resolve, reject) {
      var movie_title = firstEntityValue(entities, 'movie');
      if (movie_title) {
        context.movie = movie_title;
      }
      //call the API here
      return resolve(context);
  });
 },
};


// Our bot actions
// var actions = {
//   send({sessionId}, {text}) {
//     // Our bot has something to say!
//     // Let's retrieve the Facebook user whose session belongs to
//     var recipientId = sessions[sessionId].fbid;
//     if (recipientId) {
//       // Yay, we found our recipient!
//       // Let's forward our bot response to her.
//       // We return a promise to let our bot know when we're done sending
//       return fbMessage(recipientId, text)
//       .then(() => null)
//       .catch((err) => {
//         console.error(
//           'Oops! An error occurred while forwarding the response to',
//           recipientId,
//           ':',
//           err.stack || err
//         );
//       });
//     } else {
//       console.error('Oops! Couldn\'t find user for session:', sessionId);
//       // Giving the wheel back to our bot
//       return Promise.resolve()
//     }
//   },
//   // You should implement your custom actions here
//   // See https://wit.ai/docs/quickstart


// };

// Setting up our bot
var wit = new Wit({
  accessToken: WIT_TOKEN,
  actions,
  // logger: new log.Logger(log.INFO)
});

// Starting our webserver and putting it all together
var app = express();
app.use(({method, url}, rsp, next) => {
  rsp.on('finish', () => {
    console.log(`${rsp.statusCode} ${method} ${url}`);
  });
  next();
});
app.use(bodyParser.json({ verify: verifyRequestSignature }));

// Webhook setup
// app.get('/webhook/', (req, res) => {
//   if (req.query['hub.mode'] === 'subscribe' &&
//     req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
//     res.send(req.query['hub.challenge']);
//   } else {
//     res.sendStatus(400);
//   }
// });

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})


// Message handler
app.post('/webhook', (req, res) => {
  // Parse the Messenger payload
  // See the Webhook reference
  // https://developers.facebook.com/docs/messenger-platform/webhook-reference
  var data = req.body;

  if (data.object === 'page') {
    data.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message) {
          // Yay! We got a new message!
          // We retrieve the Facebook user ID of the sender
          var sender = event.sender.id;

          // We retrieve the user's current session, or create one if it doesn't exist
          // This is needed for our bot to figure out the conversation history
          var sessionId = findOrCreateSession(sender);

          // We retrieve the message content
          var {text, attachments} = event.message;

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





// for Facebook verification
// app.get('/webhook/', function (req, res) {
//     if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
//         res.send(req.query['hub.challenge'])
//     }
//     res.send('Error, wrong token')
// })




// app.post('/webhook/', function (req, res) {
//     messaging_events = req.body.entry[0].messaging
//     for (i = 0; i < messaging_events.length; i++) {
//         event = req.body.entry[0].messaging[i]
//         sender = event.sender.id
//         if (event.message && event.message.text) {
//             text = event.message.text
//             if (text === 'Users') {
//                 sendGenericMessage(sender)
//                 continue
//             }
//             sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
//         }
//         if (event.postback) {
//             text = JSON.stringify(event.postback)
//             sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
//             continue
//         }
//     }
//     res.sendStatus(200)
// })





// function sendTextMessage(sender, text) {
//     messageData = {
//         text:text
//     }
//     request({
//         url: 'https://graph.facebook.com/v2.6/me/messages',
//         qs: {access_token:token},
//         method: 'POST',
//         json: {
//             recipient: {id:sender},
//             message: messageData,
//         }
//     }, function(error, response, body) {
//         if (error) {
//             console.log('Error sending messages: ', error)
//         } else if (response.body.error) {
//             console.log('Error: ', response.body.error)
//         }
//     })
// }






    


// function sendGenericMessage(sender) {
//     messageData = {
//         "attachment": {
//             "type": "template",
//             "payload": {
//                 "template_type": "generic",
//                 "elements": [{
//                     "title": "First card",
//                     "subtitle": "Element #1 of an hscroll",
//                     "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
//                     "buttons": [{
//                         "type": "web_url",
//                         "url": "https://www.messenger.com",
//                         "title": "web url"
//                     }, {
//                         "type": "postback",
//                         "title": "Postback",
//                         "payload": "Payload for first element in a generic bubble",
//                     }],
//                 }, {
//                     "title": "Second card",
//                     "subtitle": "Element #2 of an hscroll",
//                     "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
//                     "buttons": [{
//                         "type": "postback",
//                         "title": "Postback",
//                         "payload": "Payload for second element in a generic bubble",
//                     }],
//                 }]
//             }
//         }
//     }
//     request({
//         url: 'https://graph.facebook.com/v2.6/me/messages',
//         qs: {access_token:token},
//         method: 'POST',
//         json: {
//             recipient: {id:sender},
//             message: messageData,
//         }
//     }, function(error, response, body) {
//         if (error) {
//             console.log('Error sending messages: ', error)
//         } else if (response.body.error) {
//             console.log('Error: ', response.body.error)
//         }
//     })
// }