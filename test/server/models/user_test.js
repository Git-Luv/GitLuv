require(TEST_HELPER) 

var request = require('supertest-as-promised')
var User = require(__server + '/models/user.js')

xdescribe("User Model", function() {

  // Promise coroutines
  it_("creates and persists data", function * () {
    var userAttrs = { username: 'mccarthyist', avatar_url: '', url: '',
    	location: '', bio: '', repos: [], followers: 0, skills: [], 
    	visionary: false, updated_at: ''}

    User.createIfNotExists(userAttrs)
      
    var allUsers = yield User.all()
    expect( allUsers.length ).to.equal(1)
    expect( allUsers[0].username ).to.equal( 'mccarthyist' )

    var getUser = yield User.getUser('mccarthyist')
    expect( getUser.username ).to.be.a('string')
    expect( getUser.username ).to.equal('mccarthyist')
    expect( getUser.bio ).to.equal('')
  })
})