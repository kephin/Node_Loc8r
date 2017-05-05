const axios = require('axios');

module.exports = {
  async getLocationInfo(locationId) {
    try {
      const response = await axios.get(`${process.env.SERVER}/api/locations/${locationId}`);
      const locationDetail = response.data;
      locationDetail.coords = {
        lng: response.data.geometry.coordinates[0],
        lat: response.data.geometry.coordinates[1],
      };
      return locationDetail;
    } catch (err) {
      if (err.response) {
        const error = new Error(err.response.data.message);
        error.status = err.response.status;
        throw error;
      } else {
        throw err;
      }
    }
  },
};
