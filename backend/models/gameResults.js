const mongoose = require('mongoose'); 
const baseSchema = require('./baseSchema'); 
// Now we can utilize base schema and in case if gameresults collection will have any different fields we can add them here
const GameResults = mongoose.model('GameResults', baseSchema, 'gameresults');

module.exports = GameResults;