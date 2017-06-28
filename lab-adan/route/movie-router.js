'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Movie = require('../model/movie.js');

let movieRouter = module.exports = new Router();

movieRouter.post('/api/movie', jsonParser, (req, res, next) => {
  console.log('hit /api/movie');
  req.body.created = new Date();

  new Movie(req.body)
    .save()
    .then(movie => res.json(movie))
    .catch(next);
});
movieRouter.get('/api/movie',(req, res, next) => {
  Movie.find({})
    .then(movie => res.json(movie))
    .catch(next);

});
movieRouter.get('/api/movie/:id', (req, res, next) => {
  console.log('hit get /api/movie/:id');
  Movie.findById(req.params.id)
    .then(movie => res.json(movie))
    .catch(next);
});
movieRouter.put('/api/movie/:id', jsonParser, (req, res, next) => {
  Movie.update({_id: req.params.id}, {name: req.body.name, score: req.body.score})
    .then(() => res.json(req.body)) // because update doesnt return the updated record
    .catch(next);
});

movieRouter.delete('/api/movie/:id', (req, res, next) => {
  Movie.deleteOne({_id: req.params.id})
    .then(() => res.sendStatus(200))
    .catch(next);
});
