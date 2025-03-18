// const express = require('express');
// const { handleGenerateNewShortUrl } = require('../controllers/url');
// const { handleRedirect, handleAnalytics } = require('../controllers/url');

// const router = express.Router();

// router.post('/URL', handleGenerateNewShortUrl);
// router.get('/:id', handleRedirect);
// router.get('/URL/analytics/:id', handleAnalytics);

// module.exports = router;
const express = require('express');

const { handleGenerateNewShortUrl, handleRedirect, handleAnalytics } = require('../controllers/url');

const router = express.Router();

// POST - Create Short URL
router.post('/create', handleGenerateNewShortUrl);

// GET - Redirect to Original URL
router.get('/:id', handleRedirect);

// GET - Get Analytics
router.get('/analytics/:id', handleAnalytics);

module.exports = router;
