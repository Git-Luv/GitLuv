require(TEST_HELPER) 

var request = require('supertest-as-promised')
var Project = require(__server + '/models/project.js')

describe("Project Model", function() {

  // Promise coroutines
  it_("creates and persists data", function * () {
    var projectAttrs = { title: 'reactjs', repo_url: 'http://www.github.com/reactjs/reactjs', 
      	description: '', req_skills: [], users_liked: [], users_disliked: []}

    var newProject = yield Project.create(projectAttrs)
    expect( newProject.title ).to.be.a('string')
    expect( newProject.title ).to.equal('Scooby')
    expect( newProject.description ).to.equal('')

    var allProjects = yield Projects.all()
    expect( allProjects.length ).to.equal(1)
    expect( allProjects[0].title ).to.equal( newProject.title )
  })
})