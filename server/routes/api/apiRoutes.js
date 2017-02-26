var express = require('express');
var apiRouter = express.Router();

module.exports = function () {

  apiRouter.use('/google',require('./googleApi')());

  return apiRouter;
};
