var express = require('express');
var apiRouter = express.Router();

module.exports = function (config) {

  apiRouter.use('/google',require('./googleApi')(config));

  return apiRouter;
};
