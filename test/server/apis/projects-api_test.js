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
      .post('/api/projects')
      .send({title: 'reactjs', repo_url: 'http://www.github.com/reactjs/reactjs',  
      	description: '', req_skills: [], users_liked: [], users_disliked: []})
      .expect(201)

    yield request(app)
      .get('/api/projects')
      .expect(200)
      .expect(function (response) {
        var projects = response.body
        expect( projects.length ).to.equal(1)
        expect( projects[0].title ).to.equal('reactjs')
        expect( projects[0].repo_url ).to.equal('http://www.github.com/reactjs/reactjs')
        expect( projects[0].description ).to.equal('')
      })
  })

  it_("gets a Project by title", function * () {
  	
  	yield request(app)
  		.get('/api/projects/reactjs')
  		.expect(200)
      .expect(function (response) {
        var projects = response.body
        expect( projects.title ).to.equal('reactjs')
        expect( projects.repo_url ).to.equal('http://www.github.com/reactjs/reactjs')
        expect( projects.description ).to.equal('')
      })
  })

  it_("edits a project", function * () {

    yield request(app)
      .patch('/api/projects')
      .send(['reactjs', {description: 'sick!!!', users_liked: ['mccarthyist']}])
      .expect(201)
  })
})