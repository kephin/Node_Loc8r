const axios = require('axios');
const moment = require('moment');

module.exports = {
  async index(req, res, next) {
    let message;
    let response = {};

    try {
      response = await axios.get(`${process.env.SERVER}/api/locations`, {
        params: req.query,
      });
      if (!response.data.length) message = 'No places found nearby!';
    } catch (err) {
      message = 'API lookup error.';
      response.data = [];
    }

    res.render('index', {
      title: 'Loc8r - find a place to work with wifi',
      pageHeader: {
        title: 'Loc8r',
        strapline: 'Find places to work with wifi near you!'
      },
      sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
      locations: response.data,
      message,
    });
  },
  async review(req, res, next) {
    try {
      const response = await axios.get(`${process.env.SERVER}/api/locations/${req.params.locationId}`);
      const locationDetail = response.data;
      locationDetail.coords = {
        lng: response.data.geometry.coordinates[0],
        lat: response.data.geometry.coordinates[1],
      };
      res.render('location-info', {
        title: locationDetail.name,
        pageHeader: {
          title: locationDetail.name,
        },
        sidebar: {
          context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
          callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: locationDetail,
        moment,
      });
    } catch (err) {
      // all 4XX - 6XX resopnse will be considered in reject
      const { status, statusText } = err.response;
      res.status(status).render('generic-text', {
        title: `${status}, ${statusText}`,
        content: err.response.data.message || 'Something goes wrong!',
      });
    }
  },
  createComment(req, res, next) {
    res.render('location-review-form', {
      title: 'Review Starcups on Loc8r',
      pageHeader: {
        title: 'Review Starcups'
      }
    });
  },
};
