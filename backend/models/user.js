const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema was not containing email field for now but index was still left in db
// Which was causing an issue so I dropped a unnesseary index in db from mongo shell
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {versionKey: false, timestamps: true});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
