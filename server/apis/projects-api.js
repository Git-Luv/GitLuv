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