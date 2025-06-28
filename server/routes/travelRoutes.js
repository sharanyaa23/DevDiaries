const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');
/**
 * app routes
 */
router.get('/', travelController.homepage);
router.get('/popularblog/:id',travelController.explorePopularblog );
router.get('/latestblog/:id',travelController.exploreLatestblog );
router.post('/search',travelController.searchPlace );
router.get('/explore-popular',travelController.explorePopular);
router.get('/explore-latest',travelController.exploreLatest);
router.get('/submit-blog',travelController.submitBlog);
router.post('/submit-blog',travelController.submitBlogOnPost);

router.get('/latestblog/:id/update', travelController.renderUpdateLatestBlog);
router.post('/latestblog/:id/update', travelController.updateLatestBlog);
router.get('/latestblog/:id/delete', travelController.renderDeleteLatestBlog);
router.post('/latestblog/:id/delete', travelController.deleteLatestBlog);



module.exports = router;