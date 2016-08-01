var express = require('express')
var User = require('../models/user')


var UsersAPI = module.exports = express.Router()

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

UsersAPI.patch('/users', function (req, res) {

	//This function takes a 2 piece array, first index is the username and
	//the second is an object of all information being changed.

	User.editUser(req.body[0], req.body[1]).then(x => res.sendStatus(201))
	.catch(function(err){
		console.log(err) 
		res.sendStatus(500)
	})
})