var express = require('express');
var _ = require('lodash');
var google = require('googleapis');

var sheets = google.sheets('v4');
var OAuth2 = google.auth.OAuth2;

module.exports = function (config) {
  var apiRouter = express.Router();
  var oauth2Client = new OAuth2(
    config.CLIENT_ID,
    config.CLIENT_SECRET,
    config.REDIRECT_URL
  );

  apiRouter.get('/createSpreadSheet', (req, res) => {
    oauth2Client.setCredentials({
      access_token: req.query.access_token,
    });

    var request = {
      resource: {
        properties: {
          title: config.DATA_FILE_NAME
        },
        sheets: [
          {
            properties: {
              title: 'Basic'
            }
          }
        ]
      },
      auth: oauth2Client
    };

    sheets.spreadsheets.create(request, function(err, response) {
      if (err) {
        return res.status(err.code).json(err.errors[0]);;
      }
      return res.json(_.pick(response, 'spreadsheetId'));
    });

  });

  return apiRouter;
};