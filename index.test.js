const request = require('supertest');
const app = require('./index');
const should = require('should');
var database = require('./database');

describe('POST /login', function() {
  it('success', function(done) {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        name: 'joe'
      })
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        should.not.exist(err);
        database.indexOf('joe').should.not.equal(-1);
        res.body.message.should.equal('success');
        done();
      });
  });

  describe('negative', function() {
    before(function() {
      database.push('ivan');
    });

    it('no name sent', function(done) {
      request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, function(err, res) {
          should.not.exist(err);
          res.body.message.should.equal('Name required');
          done();
        });
    });

    it('no name sent', function(done) {
      request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({
          name: 'ivan'
        })
        .expect('Content-Type', /json/)
        .expect(400, function(err, res) {
          should.not.exist(err);
          res.body.message.should.equal('Name already taken');
          done();
        });
    });
  });
});
