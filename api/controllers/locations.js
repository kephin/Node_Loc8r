const mongoose = require('mongoose');

const Location = require('../models/location');

module.exports = {
  async locationsListByDistance(req, res) {

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
