
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

// app.get('/auth/login', (req, res) => {
//   console.log("Running");

//   fetch('https://github.com/login/oauth/access_token?client_id=444a46dcbe1340ce4a49&client_secret=df1f3fc9a5da7f88c06a4432302c42d04ac8f151&code=' + req.param('code'), {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json'
//     }
//   })
//   .then(response => {
//     return response.json()
//   })
//   .then(result => {
//     var authToken = result.access_token;

//     return result.access_token;
//   })

// .then(function(authToken){

    // console.log('sldfjalfkj', req.get('Authorization'))
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
        .then(function(data){
            // If there is data run next()
            if(data.status === 200 || data.statusText === 'Authorized'){
                res.status(200)
                console.log('~~~~~~~~~~~~~~~~~~', authToken)
                console.log('dataaaaaaa', data);

                return next();
            }
            else{
                // else REDIRECT
                res.redirect('/');
            }
            
        })
// })
// })

}