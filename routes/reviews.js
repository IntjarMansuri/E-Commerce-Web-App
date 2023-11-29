const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { validateReview, isLoggedIn } = require('../middleware');

router.post('/products/:productId/review', isLoggedIn ,validateReview, reviewController.createReviews);

module.exports = router;