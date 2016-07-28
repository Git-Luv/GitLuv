var express = require('express');
var browserify = require('browserify-middleware');
var path = require('path');
var fetch = require('isomorphic-fetch');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 4000;

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

app.get('/auth/login', (req, res) => {
	console.log(req);
	console.log(req.param('code'))
	fetch('https://github.com/login/oauth/access_token?client_id=444a46dcbe1340ce4a49&client_secret=df1f3fc9a5da7f88c06a4432302c42d04ac8f151&code=' + req.param('code') + '&redirect_uri=http://localhost:4000/swipe', {
		method: 'POST',
		Accept: 'application/json'
	})
	.then(result => {
		console.log("Result from github auth:", result.body)
		
		//fetch()

		//res.redirect('/swipe');
});

// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})




// Start server
app.listen(port);
console.log('Listening on localhost:' + port);
