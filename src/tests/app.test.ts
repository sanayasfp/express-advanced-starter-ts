import App from 'App';
import request from 'supertest';



describe('App', () => {
  it('responds with a not found message', (done) => {
    request(App)
      .get('/what-is-this-even')
      .set('Accept', 'Application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('GET /', () => {
  it('responds with a json message', (done) => {
    request(App)
      .get('/')
      .set('Accept', 'Application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
      }, done);
  });
});
