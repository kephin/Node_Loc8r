const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlOthers = require('../controllers/others');

/* Location pages */
router.get('/', ctrlLocations.index);
router.get('/locations/:locationId', ctrlLocations.review);

/* Review pages */
router.get('/locations/:locationId/reviews/new', ctrlReviews.createComment);
router.post('/locations/:locationId/reviews/new', ctrlReviews.execCreateComment);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
