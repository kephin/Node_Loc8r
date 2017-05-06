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
  author: {
    type: String,
    required: true,
  },
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
  reviewText: {
    type: String,
    required: true,
  },
});

const geometrySchema = new Schema({
  type: {
    type: String,
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
});

const locationSchema = new Schema({
  name: String,
  address: String,
  facilities: [String],
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema],
  geometry: geometrySchema,
});

locationSchema.virtual('numOfReviews').get(function() {
  return this.reviews.length;
});

locationSchema.virtual('ratingAverage').get(function () {
  if (this.numOfReviews > 0) {
    const ratingsTotalSum = this.reviews
      .map(review => review.rating)
      .reduce((acc, cur) => acc + cur);
    return ratingsTotalSum / this.numOfReviews;
  }
  return 0;
});

const location = mongoose.model('Location', locationSchema);
module.exports = location;
