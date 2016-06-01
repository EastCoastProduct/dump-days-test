const request = require('supertest');
const app = require('./index');
const should = require('should');

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
        console.log(res.body);
        should.not.exist(err);
        res.body.message.should.equal('success');
        done();
      });
  });
});
