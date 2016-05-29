var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../app.js');

chai.use(chaiHttp);
chai.use(require('chai-json-schema'));

describe('BOOK API', function(done){
	var bookSchema;

	before(function(){
		bookSchema = {
			"title": "book schema",
			"type": "object",
			"required": ['title', 'author', 'description'],
			"properties": {
				"title": {
					type: "string"
				}
			}
		}
	});

	it('should return JSON containing all books on /book/findAll', function(done){
		this.timeout(20000);//set timeout to 20 second
		chai.request(server)
			.get('/book/findAll')
			.end(function(err, res){
				expect(res).to.be.json;
				expect(res).to.have.status(200);
				expect(res.body[0]).to.be.jsonSchema(bookSchema);
				done();
			});
	});

	it('should return book search result with query : 4+hour', function(done){
		this.timeout(20000);
		chai.request(server)
			.get('/book/search/4+hour')
			.end(function(err, res){
				expect(res).to.be.json;
				expect(res).to.have.status(200);
				expect(res.body[0]).to.be.jsonSchema(bookSchema);
				done();
			})
	});
});