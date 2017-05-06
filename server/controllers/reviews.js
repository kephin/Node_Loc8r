const axios = require('axios');

const utils = require('./utils');

module.exports = {
  async createComment(req, res, next) {
    const { locationId } = req.params;
    try {
      const response = await utils.getLocationInfo(locationId);
      res.render('location-review-form', {
        title: `Review ${response.name} on Loc8r`,
        pageHeader: {
          title: `Review ${response.name}`,
        },
        location: {
          _id: locationId,
        },
        error: req.query.err,
      });
    } catch (err) {
      next(err);
    }
  },
  async execCreateComment(req, res, next) {
    try {
      await axios.post(`${process.env.SERVER}/api/locations/${req.params.locationId}/reviews`, {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review,
      });
      res.status(201).redirect(`/location/${req.params.locationId}`);
    } catch (err) {
      if (err.response.status === 400 && err.response.data.name === 'ValidationError') {
        res.redirect(`/location/${req.params.locationId}/reviews/new?err=validation`);
      } else {
        next(err);
      }
    }
  },
};
