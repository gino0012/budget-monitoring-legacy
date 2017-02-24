var express = require('express');
var apiRouter = express.Router();

module.exports = function () {
  // middleware to use for all requests
  // apiRouter.use(function (req, res, next) {
  //   next();
  // });

  apiRouter.use('/google',require('./googleApi')());

  return apiRouter;
};
