
var Auth = module.exports;
var express = require('express');
var browserify = require('browserify-middleware');
var path = require('path');
var fetch = require('isomorphic-fetch');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();


var port = process.env.PORT || 4000;

var assetFolder = path.join(__dirname, '..', 'client','public');

// Serve Static Assets
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

var Profile = require('../apis/github-api');
var cookie = null;

Auth.isAuthenticated = function(req, res, next) {
        // Check for Authorization header in req.get('Authorization')
    var authToken = req.get('Authorization')
        // if exists then fetch data from github
        fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                Authorization: "token " + authToken,
                Accept: 'application/json'
            }
        })
        // Like that then check to see if there is data in the .then()
        .then(function(user){
            // If there is data run next()
            if(user){
                console.log('userrrrrr', user);
                return next();
            }
            else{
                // else REDIRECT
                res.redirect('/');
            }
            
        })
}