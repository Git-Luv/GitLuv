var express = require('express')
var User = require('../models/user')
var fetch = require('isomorphic-fetch');
var bodyParser = require('body-parser');



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

UsersAPI.get('/users/:username', function (req, res) {
  fetch("https://api.github.com/users/:username", {
    method: 'GET',
    headers: {
      Authorization: "token " + document.cookie.split('=')[1],
      Accept: 'application/json'
    }
  })
  User.getUser(req.params.username)
  .then(function(user){
  	res.status(200).send(user)
  })
  .catch(function (err){
  	console.log("get error: ", err)
  	res.status(500).send(err)
  })
})


UsersAPI.post('/users', function (req, res) {

  User.createIfNotExists( req.body )
  res.sendStatus(201)
})