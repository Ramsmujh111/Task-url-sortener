const express = require('express');
const routes = express.Router();
const UrlShortenerController = require('../controller/url');

routes.post('/api/shorten' , UrlShortenerController.UrlShortener);
routes.get('/:code' , UrlShortenerController.UrlRedirect);

module.exports = routes;