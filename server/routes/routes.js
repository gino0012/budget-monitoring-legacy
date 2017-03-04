module.exports = function (app, config) {
  app.use('/api', require('./api/apiRoutes')(config));
};
