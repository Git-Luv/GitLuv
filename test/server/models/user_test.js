require(TEST_HELPER) 

var request = require('supertest-as-promised')
var User = require(__server + '/models/user.js')

describe("User Model", function() {

  // Promise coroutines
  it_("creates and persists data", function * () {
    var userAttrs = { username: 'mccarthyist', avatar_url: '', url: '',
    	location: '', bio: '', repos: [], followers: 0, skills: [], 
    	visionary: false, updated_at: ''}

    var newUser = yield User.create(userAttrs)
    expect( newUse.title ).to.be.a('string')
    expect( newUser.title ).to.equal('Scooby')
    expect( newPet.description ).to.equal('')

    var allUsers = yield User.all()
    expect( allUsers.length ).to.equal(1)
    expect( allUsers[0].title ).to.equal( newUser.title )
  })
})