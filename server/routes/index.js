const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

/* Location pages */
router.get('/', ctrlLocations.index);
router.get('/location/:locationId', ctrlLocations.review);
router.get('/location/review/new', ctrlLocations.createComment);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
