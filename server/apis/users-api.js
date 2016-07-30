var express = require('express')
var User = require('../models/user')
var fetch = require('isomorphic-fetch');
var bodyParser = require('body-parser');

var Utils      = require(path.join(__dirname, './utils.js'));
var db         = require(path.join(__dirname, './db.js'));


var UsersAPI = module.exports = express.Router()


app.use(bodyParser.json());


UsersAPI.get('/users', function (req, res) {
  
  User.all()
    .then(function (users) {
      res.status(200).send(users)
    })
    .catch(function (err) {
      console.log("Users.all error:", err)
      res.status(500).send(err)
    })
})

// UsersAPI.get('/users/:username', function (req, res) {
  
//   User.getUser(req.params.username)
//   .then(function(user){
//   	res.status(200).send(user)
//   })
//   .catch(function (err){
//   	console.log("get error: ", err)
//   	res.status(500).send(err)
//   })
// })

UsersAPI.get('/users/:username', function(req, res) {
  fetch("https://api.github.com/users/:username", {
      method: 'GET',
      headers: {
        Authorization: "token " + document.cookie.split('=')[1],
        Accept: 'application/json'
      }
    })
  .then(function(user){
    console.log('user my api', user)
    res.status(200).send(user)
  })
  .catch(function(err){
    console.log('my error', err)
    res.status(500).send(err)
  })
  
})
UsersAPI.post('/insertUser', function(req, res){
  db.collection('usercollections').insert(req.body).then(function(value){
    db.collection('usercollections').find().then(function(value){
    res.send(value)
  })  
  })
  
})


UsersAPI.post('/users', function (req, res) {

  User.createIfNotExists( req.body )
  res.sendStatus(201)
})