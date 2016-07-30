require(TEST_HELPER) 

var request = require('supertest-as-promised')
var Project = require(__server + '/models/project.js')

xdescribe("Project Model", function() {

  // Promise coroutines
  it_("creates and persists data", function * () {
    var projectAttrs = { title: 'reactjs', repo_url: 'http://www.github.com/reactjs/reactjs', 
      	description: '', req_skills: [], users_liked: [], users_disliked: []}

    Project.createIfNotExists(projectAttrs)

    var allProjects = yield Project.all()
    expect( allProjects.length ).to.equal(1)
    expect( allProjects[0].title ).to.equal( 'reactjs' )

    var getProject = yield Project.getProject('reactjs')    
    expect( getProject.title ).to.be.a('string')
    expect( getProject.title ).to.equal('reactjs')
    expect( getProject.description ).to.equal('')
  })
})