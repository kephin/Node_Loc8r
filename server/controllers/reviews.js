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
      });
    } catch (err) {
      next(err);
    }
  },
  async execCreateComment(req, res, next) {

  },
};
