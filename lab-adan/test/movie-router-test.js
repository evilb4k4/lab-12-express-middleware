require('dotenv').config({ path: `${__dirname}/../.test.env` });
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempMovie;

describe('testing movie routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/movie', () => {
    it('should respond with a movie', () => {
      return superagent
        .post(`${API_URL}/api/movie`)
        .send({
          name: 'John Wick',
          review: 'A most watch movie',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('John Wick');
          expect(res.body.review).toEqual('A most watch movie');
          tempMovie = res.body;
        });
    });

    it('should respond with 400 invalid request body', () => {
      return superagent.post(`${API_URL}/api/movie`).send().catch(err => {
        expect(err.status).toEqual(400);
      });
    });
  });

  describe('testing GET /api/movie', () => {
    it('should respond with a movie', () => {
      return superagent
        .get(`${API_URL}/api/movie/${tempMovie._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('John Wick');
          expect(res.body.review).toEqual('A most watch movie');
        });
    });
    it('should respond with a 404 not found', () => {
      return superagent.get(`${API_URL}/api/movie/`).catch(err => {
        expect(err.status).toEqual(404);
      });
    });
  });

  describe('testing PUT /api/movie', () => {
    it('should respond with a 200 and updated movie', () => {
      return superagent
        .put(`${API_URL}/api/movie/${tempMovie._id}`)
        .send({
          name: 'John Wick 2',
          score: '2 thumbs up',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('John Wick 2');
          expect(res.body.review).toEqual('2 thumbs up');
        });
    });
  });

  describe('testing DELETE /api/movie', () => {
    it('should respond with a 200', () => {
      return superagent
        .delete(`${API_URL}/api/movie/${tempMovie._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toNotExist();
        });
    });
  });
});
