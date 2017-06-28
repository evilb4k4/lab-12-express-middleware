'use strict';

const mongoose = require('mongoose');

// define a schema for your model
const movieSchema = mongoose.Schema({
  name: {type:String, required: true},
  review: {type:String, required: true},
});

// export a model
module.exports = mongoose.model('movie', movieSchema);
