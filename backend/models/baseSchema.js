const mongoose = require('mongoose');
// Since it wasn't said to not touch old code logic and 
// I've noticed in DB that both gameresults and saves had a same schema, I decided to turn this into BaseSchema
// And clone it to other places in case I'd need something else in that particular ones
// by doing so I would save time and have everything more in sync to each other

const baseSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  gameDate: { type: Date, required: true, default: Date.now },
  failed: { type: Number, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Normal', 'Hard'],  
  },
  completed: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
}, {versionKey: false, timestamps: true});

module.exports = baseSchema;