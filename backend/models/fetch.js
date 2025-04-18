const mongoose = require('mongoose'); 
const baseSchema = require('./baseSchema'); 
// Now we can utilize base schema and in case if gameresults collection will have any different fields we can add them here
const Fetch = mongoose.model('Fetch', baseSchema, 'gameresults');

module.exports = Fetch;