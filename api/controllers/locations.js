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

  },
  async locationsReadOne(req, res) {
    const id = req.params.locationId;
    if (!id) return res.status(404).json({ message: 'No locationId in request' });

    try {
      const location = await Location.findById(id);
      if (!location) return res.status(404).json({ message: 'locationId not found' });
      return res.status(200).json(location);
    } catch (err) {
      return res.status(404).json(err);
    }
  },
  async locationsUpdateOne(req, res) {

  },
  async locationsDeleteOne(req, res) {

  },
};
