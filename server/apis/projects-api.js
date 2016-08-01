var express = require('express')
var Project = require('../models/project')


var ProjectsAPI = module.exports = express.Router()

ProjectsAPI.get('/projects', function (req, res) {
  Project.all()
    .then(function (projects) {
      res.status(200).send(projects)
    })
    .catch(function (err) {
      console.log("Project.all error:", err)
      res.status(500).send(err)
    })
})

ProjectsAPI.get('/projects/:title', function (req, res) {

  Project.getProject(req.params.title)
  .then(function(project){
  	res.status(200).send(project)
  })
  .catch(function (err){
  	console.log("get error: ", err)
  	res.status(500).send(err)
  })
})


ProjectsAPI.post('/projects', function (req, res) {

  Project.createIfNotExists( req.body )
  res.sendStatus(201)
})

ProjectsAPI.patch('/projects', function (req, res) {

	//This function takes a 2 piece array, first index is the title and
	//the second is an object of all information being changed.

	console.log('lolwut ' + JSON.stringify(req.body))

	Project.editProject(req.body[0], req.body[1]).then(x => res.sendStatus(201))
	.catch(function(err){
		console.log(err) 
		res.sendStatus(500)
	})
})