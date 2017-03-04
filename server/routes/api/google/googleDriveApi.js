var http = require('request-promise');
var express = require('express');
var _ = require('lodash');
var google = require('googleapis');

var googleDrive = google.drive('v3');
var OAuth2 = google.auth.OAuth2;

module.exports = function (config) {
  var apiRouter = express.Router();
  var oauth2Client = new OAuth2(
    config.CLIENT_ID,
    config.CLIENT_SECRET,
    config.REDIRECT_URL
  );

  apiRouter.get('/getSpreadSheetIdByName', (req, res) => {
    oauth2Client.setCredentials({
      access_token: req.query.access_token,
    });

    googleDrive.files.list({auth: oauth2Client}, (err, response) => {
      if (err) {
        return res.status(err.code).json(err);;
      }
      var result = _.chain(response.files).find({name: req.query.file_name}).pick('id');
      return res.json(result);
    });
  });

  return apiRouter;
};
