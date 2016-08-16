var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
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
// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})
// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            sendTextMessage(sender, "I'm here to stay, holla back: " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
})
var token = "EAADF9ay2h5gBAOvwyJAFpwqG9y3Wg3Q4JWZAfpVgDXNKrvwfObIUbq7ZCbNERuuPdMLy6cGoanbryqx6XEcF9tWnkGA7ZAwHJo9LUFCplndhA1Kw8c1NjaS49vHjjjhebzCw7PiWUsNVa0bxOQ4BQKqLsbCLIWiZC8GR7FZAKlAZDZD"

function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}