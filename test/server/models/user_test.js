require(TEST_HELPER) 

var request = require('supertest-as-promised')
var User = require(__server + '/models/user.js')

describe("User Model", function() {

  // Promise coroutines
  it_("creates and persists data", function * () {
    var userAttrs = { username: 'mccarthyist', avatar_url: '', url: '',
    	location: '', bio: '', repos: [], followers: 0, skills: [], 
    	visionary: false, updated_at: ''}

    User.createIfNotExists(userAttrs)
      
    var allUsers = yield User.all()
    console.log("allUsers", allUsers)
    expect( allUsers.length ).to.equal(1)
    expect( allUsers[0].username ).to.equal( 'mccarthyist' )

  
    // expect( user.username ).to.be.a('string')
    // expect( user.username ).to.equal('mccarthyist')
    // expect( user.bio ).to.equal('')
  })
})