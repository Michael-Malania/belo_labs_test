const mongoose = require('mongoose'); 
const baseSchema = require('./baseSchema'); 
// Now we can utilize base schema and in case if save collection will have any different fields we can add them here
const Save = mongoose.model('Save', baseSchema, 'save');

module.exports = Save;