var express = require('express');
var browserify = require('browserify-middleware');
var path = require('path');
var fetch = require('isomorphic-fetch');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user');


var app = express();


var port = process.env.PORT || 4000;

var assetFolder = path.join(__dirname, '..', 'client','public');

// Serve Static Assets
app.use(express.static(assetFolder));
app.use(bodyParser.json());

// var routes = express.Router()

// routes.use( '/api', require('./apis/projects-api.js') )

// app.use('/', routes)

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
//set up middleware to check 'isAuthenticate' on protected endpoints

var Profile = require('./apis/github-api');
var cookie = null;

app.get('/auth/login', (req, res) => {
  console.log("Running");

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
      console.log('data getuserdata', data)
      //'/api/users/:username'
      //User.getUser(req.params.username)
      //if exists send to '/swipe' endpoint
      //'/api/usersPOST'
      //if not exist send to '/skills' endpoint
      User.getUser(data.login)
      .then(userData => {
        console.log('!!!!userData', userData);
        if(!userData){
        //store user in DB?
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
            res.cookie("AuthToken", cookie)
            res.redirect('/skills');
        }
        else {
          res.cookie("AuthToken", cookie)
          res.redirect('/swipe');

        }
      })

  })

});

//
// Project API
//

var Project = require('./models/project')

app.use('/api/projectsGET', function (req, res) {

  Project.all()
    .then(function (projects) {
        console.log("getting!!: ", projects)
      res.status(200).send(projects)
    })
    .catch(function (err) {
      console.log("Project.all error:", err)
      res.status(500).send(err)
    })
})

app.use('/api/projects/:title', function (req, res) {

  Project.getProject(req.params.title)
  .then(function(project){
    res.status(200).send(project)
  })
  .catch(function (err){
    console.log("get error: ", err)
    res.status(500).send(err)
  })
})


app.use('/api/projectsPOST', function (req, res) {

  Project.createIfNotExists( req.body )
  res.sendStatus(201)
})

app.use('/api/projectsPATCH', function (req, res) {

  //This function takes a 2 piece array, first index is the title and
  //the second is an object of all information being changed.

  console.log('lolwut ' + JSON.stringify(req.body))

  Project.editProject(req.body[0], req.body[1]).then(x => res.sendStatus(201))
  .catch(function(err){
    console.log(err) 
    res.sendStatus(500)
  })
})

//
// Users API
//


app.use('/api/usersGET', function (req, res) {
  User.all()
    .then(function (users) {
      res.status(200).send(users)
    })
    .catch(function (err) {
      console.log("Users.all error:", err)
      res.status(500).send(err)
    })
})

app.use('/api/users/:username', function (req, res) {

  User.getUser(req.params.username)
    .then(function(user){
      res.status(200).send(user)
    })
    .catch(function (err){
      console.log("get error: ", err)
      res.status(500).send(err)
    })
})


app.use('/api/usersPOST', function (req, res) {
  console.log("running usersPost")
  User.createIfNotExists( req.body )
  res.sendStatus(201)
})

app.use('/api/usersPATCH', function (req, res) {

  //This function takes a 2 piece array, first index is the username and
  //the second is an object of all information being changed.
  console.log("running usersPatch")
  User.editUser(req.body[0], req.body[1]).then(x => res.sendStatus(201))
  .catch(function(err){
    console.log(err) 
    res.sendStatus(500)
  })
})

//
// Chat API
//

var Chat = require('./models/chat')

app.use('/api/chat/:chatRoom', function (req, res) {
  
  console.log("chat API params: ", req.params.chatRoom)
  Chat.getChatroom(req.params.chatRoom)
    .then(function(room){
      res.status(200).send(room)
    })
    .catch(function(err){
      console.log("chat get error: ", err)
      res.sendStatus(500)
    })
})

app.use('/api/chatPOST', function (req, res) {
  
  console.log("creating chatroom: ", req.body)
  Chat.createIfNotExists( req.body )
  res.sendStatus(201)
})

app.use('/api/chatPATCH', function (req, res) {

  console.log("patching chatroom: ", req.body)
  Chat.updateChatroom(req.body[0], req.body[1]).then(x => res.sendStatus(201))
  .catch(function(err){
    console.log("chat patch error: ", err)
  })
})

//
// Chat Sockets
//




// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})

//
// Static assets (html, etc.)
//
var assetFolder = path.resolve(__dirname, '../client/public')
var apiFolder   = path.resolve(__dirname, './apis') 

var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
