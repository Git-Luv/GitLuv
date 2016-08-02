require(TEST_HELPER) 

var request = require('supertest-as-promised')
var routes = require(__server + '/apis/users-api.js')

describe("Users API", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  xit_("creates and gets all Users", function * () {
    var newUser;

    yield request(app)
      .post('/users')
      .send({ username: 'mccarthyist', avatar_url: '', url: '', location: '', bio: '',
       repos: [], followers: 0, skills: ["react.js", "node.js", "dancing"], visionary: false, updated_at: ''})
      .expect(201)

    yield request(app)
      .get('/users')
      .expect(200)
      .expect(function (response) {
        var users = response.body
        expect( users.length ).to.equal(1)
        expect( users[0].username ).to.equal('mccarthyist' )
        expect( users[0].avatar_url ).to.equal('')
        expect( users[0].url ).to.equal('')
        expect( users[0].location ).to.equal('')
        expect( users[0].bio ).to.equal('')
        expect( users[0].followers ).to.equal(0)
        expect( users[0].visionary ).to.equal(false)
        expect( users[0].updated_at ).to.equal('')
      })
  })

  xit_("gets a User by username", function * () {
  	
  	yield request(app)
  		.get('/users/mccarthyist')
  		.expect(200)
      	.expect(function (response) {
        	var user = response.body
          expect( user.username ).to.equal('mccarthyist' )
          expect( user.avatar_url ).to.equal('')
          expect( user.url ).to.equal('')
          expect( user.location ).to.equal('')
          expect( user.bio ).to.equal('')
          expect( user.followers ).to.equal(0)
          expect( user.visionary ).to.equal(false)
          expect( user.updated_at ).to.equal('')
      	})
  })

  it_("edits an existing user/pushes new skills", function * () {
    yield request(app)
      .patch('/users')
      .send(['mccarthyist', {skills: ['lol', 'werk', 'react.js'], visionary: true, projects: ['wut', 'duh', 'hek']}])
      .expect(201)
  })

})