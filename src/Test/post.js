process.env.NODE_ENV = 'test';

let chai = require('chai');
// let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var assert = require('assert');

let Post = require('../database/models/Post');


chai.use(chaiHttp);
//Our parent block
describe('Post', () => {
    beforeEach((done) => {  //Before each test we empty the database
        Post.remove({}, (err) => {
           done();
        });
    });

    //Test the /GET route
  describe('/GET Post', () => {
      it('it should GET all the posts', (done) => {
        chai.request(server)
            .get('/post')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
});

  
  //Test the /post/addPost route
describe('/POST post', () => {
  it('it should not POST a post without pages field', (done) => {
      let post = {
          title: "The Lord of the Rings"
      }
    chai.request(server)
        .post('/post')
        .send(post)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('pages');
              res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
  });
});
