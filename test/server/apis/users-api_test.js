require(TEST_HELPER) 

var request = require('supertest-as-promised')
var routes = require(__server + '/apis/users-api.js')

describe("Users API", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  it_("creates and gets all Users", function * () {
    var newUser;

    yield request(app)
      .post('/users')
      .send({ username: 'mccarthyist', avatar_url: '', url: '', location: '', bio: '',
       repos: [], followers: 0, skills: [], visionary: false, updated_at: ''})
      .expect(201)
      .expect(function(response) {
        newUser = response.body

        expect( newUser.name ).to.equal('mccarthyist')
        expect( newUser.avatar_url ).to.equal('')
        expect( newUser.url ).to.equal('')
        expect( newUser.location ).to.equal('')
        expect( newUser.bio ).to.equal('')
        expect( newUser.repos ).to.equal([])
        expect( newUser.followers ).to.equal(0)
        expect( newUser.skills ).to.equal([])
        expect( newUser.visionary ).to.equal(false)
        expect( newUser.updated_at ).to.equal('')
      })

    yield request(app)
      .get('/users')
      .expect(200)
      .expect(function (response) {
        var users = response.body
        expect( users.length ).to.equal(1)
        expect( users[0].username ).to.equal( newUser.username )
      })
  })
})