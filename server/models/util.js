
var Auth = module.exports;
var express = require('express');
var fetch = require('isomorphic-fetch');
var app = express();

//
// Github Authorization
//
//set up middleware to check 'isAuthenticate' on protected endpoints

Auth.isAuthenticated = function(req, res, next) {
    // console.log('sldfjalfkj', req.get('Authorization'))
        // Check for Authorization header in req.get('Authorization')
    var authToken = req.get('Authorization')
        if(!authToken){
            res.send(401);
        }
        else{
            // if exists then fetch data from github
            fetch('https://api.github.com/user', {
                method: 'GET',
                headers: {
                    Authorization: "token " + authToken,
                    Accept: 'application/json'
                }
            })
            .then(function(data){
                // console.log('cookie test???', document.cookie.split(''))
                // If there is data run next()
                if(data.status === 200 || data.statusText === 'Authorized'){
                    console.log('made it')                
                    return next();
                }
                else{
                    // else REDIRECT
                    res.redirect('/');
                }    
            })         
        }
}