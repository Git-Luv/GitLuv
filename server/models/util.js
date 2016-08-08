
var Auth = module.exports;

// Auth.isAuthenticated = function(req, res, next) {
//     // do any checks you want to in here

//     // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
//     // you can do this however you want with whatever variables you set up
//     if (req.user.authenticated)
//         return next();

//     // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
//     res.redirect('/');
// }

Auth.isAuthenticated = function(req, res, next) {
        // Check for Authorization header in req.get('Authorization')

        // if exists then fetch data from github
        fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                Authorization: "token " + access_token,
                Accept: 'application/json'
            }
        })
        .then(function(user){
            if(user){
                console.log('userrrrrr', user);
                return next();
            }
            else{
                res.redirect('/');
            }
        })
        // Like that then check to see if there is data in the .then()

        // If there is data run next()
        // else REDIRECT
}