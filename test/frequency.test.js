const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../frequency');

describe('String tests', () => {
  it('accurately checks occurances are accuracte', () => {
    return supertest(app)
      .get('/frequency')
      .query({ s: 'aaBBAAbbaa' })
      .expect(200)
      .then((res) => {
        expect(res.header).includes(/json/);
        expect(res.body).to.be.an('object');
        expect(res.body).includes({ a: 6 });
        expect(res.body).includes({ b: 4 });
        expect(res.body).includes({ unique: 2 });
        expect(res.body).includes({ average: 5 });
        expect(res.body).includes({ highest: 'a' });
      });
  });

  it('thows an error if string is undefined', () => {
    return supertest(app)
      .get('/frequency')
      .query({ s: '' })
      .expect(400)
      .then((res) => {
        expect(res.error.text).includes('Invalid request');
      });
  });
});
