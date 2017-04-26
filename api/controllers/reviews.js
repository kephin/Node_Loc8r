const mongoose = require('mongoose');

const Location = require('../models/location');

module.exports = {
  async reviewsCreate(req, res) {
    const { author, rating, reviewText } = req.body;
    const newReview = { author, rating, reviewText };
    // find the correct parent document
    const { locationId } = req.params;
    let location;
    try {
      location = await Location.findById(locationId).select('reviews');
      if (!location) return res.status(404).json({ message: 'Location not found.' });
    } catch (err) {
      res.status(404).json(err);
    }
    // add new subdocument and save the parent document
    try {
      location.reviews.push(newReview);
      const newLocation = await location.save();
      res.status(201).json(newLocation.reviews.pop());
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async reviewsReadOne(req, res) {
    const { locationId, reviewId } = req.params;
    if (!locationId || !reviewId) return res.status(404).json({ message: 'No locationId or reivewId in request.' });

    try {
      const location = await Location
        .findById(locationId)
        .select('name reviews');
      if (!location) return res.status(404).json({ message: 'locationId not found.' });
      const review = location.reviews.id(reviewId);
      if (!review) return res.status(404).json({ message: 'reviewId not found.' });

      return res.status(200).json({
        location: {
          name: location.name,
          id: locationId,
        },
        review: review,
      });
    } catch (err) {
      return res.json(404).json(err);
    }
  },
  async reviewsUpdateOne(req, res) {

  },
  async reviewsDeleteOne(req, res) {

  },
};
