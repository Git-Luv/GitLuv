require(TEST_HELPER) 

var request = require('supertest-as-promised')
var routes = require(__server + '/apis/projects-api.js')

describe("Projects API", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  it_("creates and gets all Projects", function * () {
    var newProject;

    yield request(app)
      .post('/projects')
      .send({ title: 'gitluv', repo_url: 'http://www.github.com/git-luv/gitluv', 
      	description: '', req_skills: [], users_liked: [], users_disliked: []})
      .expect(201)
      .expect(function(response) {
        newProject = response.body

        expect( newUser.title ).to.equal('mccarthyist')
        expect( newUser.repo_url ).to.equal('http://www.github.com/git-luv/gitluv')
        expect( newUser.description ).to.equal('')
        expect( newUser.req_skills ).to.equal([])
        expect( newUser.users_liked ).to.equal([])
        expect( newUser.users_disliked ).to.equal([])
      })

    yield request(app)
      .get('/projects')
      .expect(200)
      .expect(function (response) {
        var projects = response.body
        expect( projects.length ).to.equal(1)
        expect( projects[0].title ).to.equal( newProject.title )
      })
  })
})