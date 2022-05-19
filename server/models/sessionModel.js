const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//session will be removed after 24 hours
const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 6000, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);
