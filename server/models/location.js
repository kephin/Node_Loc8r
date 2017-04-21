const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const openingTimeSchema = new Schema({
  days: {
    type: String,
    required: true,
  },
  opening: String,
  closing: String,
  closed: {
    type: Boolean,
    required: true,
  },
});

const locationSchema = new Schema({
  name: String,
  address: String,
  facilities: [String],
  openingTimes: [openingTimeSchema],
});

const location = mongoose.model('Location', locationSchema);
module.exports = location;
