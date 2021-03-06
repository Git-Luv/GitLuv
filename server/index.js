var express = require('express');
var browserify = require('browserify-middleware');
var path = require('path');
var fetch = require('isomorphic-fetch');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path')

var Project = require('./models/project')
var User = require('./models/user');
var Chat = require('./models/chat')
var Notify = require('./models/notifications');
var Auth = require('./models/util')

//code to start express.js
var app = express();
exports.app = app
var server = app.listen(4000);  
var io = require('socket.io').listen(server)
var assetFolder = path.join(__dirname, '..', 'client','public');

// Serve Static Assets
app.use(express.static(assetFolder));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve JS Assets
app.get('/app-bundle.js',
 browserify('./client/index.js', {
    transform: [ [ require('babelify'), { presets: ['es2015', 'react'] } ] ]
  })
);


//
// Github Authorization
//

var Profile = require('./apis/github-api');
var cookie = null;

app.get('/auth/login', (req, res) => {

  fetch('https://github.com/login/oauth/access_token?client_id=444a46dcbe1340ce4a49&client_secret=df1f3fc9a5da7f88c06a4432302c42d04ac8f151&code=' + req.param('code'), {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  })
  .then(response => {
    return response.json()
  })
  .then(result => {
    cookie = result.access_token;
    return Profile.getUserData(result.access_token)
  })
  .then(data => {
      //'/api/users/:username'
      //User.getUser(req.params.username)
      //if exists send to '/swipe' endpoint
      //'/api/usersPOST'
      //if not exist send to '/skills' endpoint
      User.getUser(data.login)
      .then(userData => {
        if(!userData){

        //store user in DB
          var userStuff = {
            username: data.login,
            avatar_url: data.avatar_url,
            url: data.html_url,
            location: data.location,
            bio: data.bio,
            followers: data.followers,
            updated_at: data.updated_at
          }
          User.createIfNotExists( userStuff )
          Notify.add({ 
            description: "Welcome to GitLuv!",
            username: data.login,
          })
          res.cookie("AuthToken", cookie)
          res.redirect('/skills');
        } else {
          res.cookie("AuthToken", cookie)
          res.redirect('/swipe');
        }
      })
  })
});


//
// Project API
//

app.use('/api/projectsGET', Auth.isAuthenticated, function (req, res) {

  Project.all()
    .then(function (projects) {
        console.log("getting!!: ", projects)
      res.status(200).send(projects)
    })
    .catch(function (err) {
      console.log("Project.all error: ", err)
      res.status(500).send(err)
    })
})

app.use('/api/projects/:title', Auth.isAuthenticated, function (req, res) {

  Project.getProject(req.params.title)
    .then(function(project){
      res.status(200).send(project)
    })
    .catch(function (err){
      console.log("Project.getProject error: ", err)
      res.status(500).send(err)
    })
})


app.use('/api/projectsPOST', Auth.isAuthenticated, function (req, res) {
  Project.createIfNotExists( req.body )
  res.sendStatus(201)
})

app.use('/api/projectsPATCH', Auth.isAuthenticated, function (req, res) {

  //This function takes a 2 piece array, first index is the title and
  //the second is an object of all information being changed.

  console.log('lolwut ' + JSON.stringify(req.body))

  Project.editProject(req.body[0], req.body[1])
    .then(x => res.sendStatus(201))
    .catch(function(err){
      console.log("Project.updateProject error: ", err) 
      res.sendStatus(500)
    })
})


//
// Users API
//

app.use('/api/usersGET', Auth.isAuthenticated, function (req, res) {
  User.all()
    .then(function (users) {
      res.status(200).send(users)
    })
    .catch(function (err) {
      console.log("Users.all error:", err)
      res.status(500).send(err)
    })
})

app.use('/api/users/:username', Auth.isAuthenticated, function (req, res) {

  User.getUser(req.params.username)
    .then(function(user){
      res.status(200).send(user)
    })
    .catch(function (err){
      console.log("Users.getUser error: ", err)
      res.status(500).send(err)
    })
})


app.use('/api/usersPOST', Auth.isAuthenticated, function (req, res) {

  User.createIfNotExists( req.body )
  res.sendStatus(201)
})

app.use('/api/usersPATCH', Auth.isAuthenticated, function (req, res) {

  //This function takes a 2 piece array, first index is the username and
  //the second is an object of all information being changed.

  User.editUser(req.body[0], req.body[1])
  .then(x => res.sendStatus(201))
  .catch(function(err){
    console.log("User.updateUser error: ", err) 
    res.sendStatus(500)
  })
})

//
// Notifications API
//

app.delete('/api/notifications', (req, res) => {
  Notify.remove(req.body);
  res.send({});
})

app.post('/api/notifications', (req, res) => {
  Notify.add(req.body);
  res.send({});
})

app.get('/api/notifications/:username', (req, res) => {
  Notify.get(req.params.username)
  .then(data => {
    res.send(data);
  })
})

app.get('/api/unreadNotifications/:username', (req, res) => {
  Notify.getUnread(req.params.username)
  .then(data => {
    res.send(data);
  })
})

app.get('/api/getNotifications/:id', (req, res) => {
  console.log(req.params.id)
  Notify.getOne(req.params.id)
  .then(data => {
    res.send(data);
  })
})

app.patch('/api/notifications', (req, res) => {
  Notify.read(req.body.id)
  res.send({})
})


//
// Chat API
//

app.use('/api/chatGET', Auth.isAuthenticated, function (req, res) {

  Chat.all()
    .then(function (chats) {
      res.status(200).send(chats)
    })
    .catch(function (err) {
      console.log("Chat.all error:", err)
      res.status(500).send(err)
    })
})

app.use('/api/chat/:chatRoom', Auth.isAuthenticated, function (req, res) {

 
  Chat.getChatroom(req.params.chatRoom)
    .then(function(room){
      res.status(200).send(room)
    })
    .catch(function(err){
      console.log("Chat.getChatroom error: ", err)
      res.sendStatus(500)
    })
})

app.use('/api/chatPOST', Auth.isAuthenticated, function (req, res) {
  
  Chat.createIfNotExists( req.body )
  res.sendStatus(201)
})

app.use('/api/chatPATCH', Auth.isAuthenticated, function (req, res) {

  Chat.updateChatroom(req.body[0], req.body[1])
  .then(x => res.sendStatus(201))
  .catch(function(err){
    console.log("Chat.updateChatroom error: ", err)
  })
})


//
// Chat Sockets
//

io.on('connection', function(socket){

  //subscribe functionality triggered upon entering messages tab.
  socket.on('subscribe', function(room) {
    console.log('joining room', room);
    socket.join(room);
  })

  //unsubscribe functionality triggered upon leaving a room.
  socket.on('unsubscribe', function(room) {
    console.log('leaving room', room);
    socket.leave(room);
  })

  //send functionality when someone submits a message.
  socket.on('send', function(data) {
    'use strict'

    let roomSub = data.room
    
    if(data.message){
      
      Notify.add({
        description: `New message from ${data.sentBy}: ${data.message}`,
        username: data.room.split(data.sentBy).filter(element => element)[0],
      })
      
      Chat.updateChatroom(data.room, {messages: [data]})
        .then(function(x){
          console.log("in '.then()' roomName: " + roomSub + " data: " + data)
          data.room = roomSub
          io.in(data.room).emit('chat message', data);
        })
    }
  });
})


// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})

//
// Static assets (html, etc.)
//
var assetFolder = path.resolve(__dirname, '../client/public')
var apiFolder   = path.resolve(__dirname, './apis') 

// var port = process.env.PORT || 4000
// app.listen(port)
// console.log("Listening on port", port)
