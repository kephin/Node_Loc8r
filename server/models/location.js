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

const reviewSchema = new Schema({
  author: String,
  rating: {
    type: Number,
    max: 5,
    min: 0,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  reviewText: String,
});

const locationSchema = new Schema({
  name: String,
  address: String,
  facilities: [String],
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema],
});

const location = mongoose.model('Location', locationSchema);
module.exports = location;
