var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../app.js');

chai.use(chaiHttp);
chai.use(require('chai-json-schema'));

describe('USER API', function(done){
	var signupObj;

	before(function(){
		signupObj = {
			username: "someuser",
			email: "test@test.com",
			password: "ssshhh-its-a-secret!"
		};

		badSignupObj = {
			username: "someuser",
			email: "testdfdfff@ddddd",
			password: "ssshhh-its-a-secret!"
		};
	})

	it('should return token when signup success', function(done){
		this.timeout(20000);
		chai.request(server)
			.post('/user/signup')
			.send(signupObj)
			.end(function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});

	it('should throw error when posting bad signup data', function(done){
		this.timeout(20000);
		chai.request(server)
			.post('/user/signup')
			.send(badSignupObj)
			.end(function(err,res){
				expect(res).to.have.status(400);
				done();
			});
	});
});