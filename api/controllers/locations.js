const mongoose = require('mongoose');

const Location = require('../models/location');

module.exports = {
  async locationsListByDistance(req, res) {
    const { lng, lat, maxDistance } = req.query;
    try {
      const locations = await Location
        .geoNear({
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)],
        }, {
          spherical: true,
          num: 10,
          maxDistance: parseFloat(maxDistance),
        });

      const outputLocations = locations
        .map(location => ({
          _id: location.obj._id,
          name: location.obj.name,
          address: location.obj.address,
          facilities: location.obj.facilities,
          distance: location.dis,
          ratingAverage: location.obj.ratingAverage,
          numOfReviews: location.obj.numOfReviews,
        }));

      res.status(200).json(outputLocations);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  async locationsCreate(req, res) {
    try {
      const newLocation = await Location.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(',').map(facility => facility.trim()),
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        },
        openingTimes: [{
          days: req.body.days,
          opening: req.body.opening,
          closing: req.body.closing,
          closed: req.body.closed,
        }],
      });
      res.status(201).json(newLocation);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  async locationsReadOne(req, res) {
    const id = req.params.locationId;
    if (!id) return res.status(404).json({ message: 'No locationId in request' });

    try {
      const location = await Location.findById(id);
      if (!location) return res.status(404).json({ message: 'Location not found' });
      const locationWithRating = Object.assign({ rating: location.ratingAverage }, JSON.parse(JSON.stringify(location)));
      return res.status(200).json(locationWithRating);
    } catch (err) {
      return res.status(404).json(err);
    }
  },
  async locationsUpdateOne(req, res) {
    const { locationId } = req.params;
    try {
      const newLocation = await Location.findByIdAndUpdate(locationId, {
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(',').map(facility => facility.trim()),
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        },
        openingTimes: [{
          days: req.body.days,
          opening: req.body.opening,
          closing: req.body.closing,
          closed: req.body.closed,
        }],
      }, { new: true });
      res.status(200).json(newLocation);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  async locationsDeleteOne(req, res) {
    const { locationId } = req.params;
    try {
      const location = await Location.findByIdAndRemove(locationId);
      res.status(200).json(location);
    } catch (err) {
      res.status(404).json(err);
    }
  },
};
