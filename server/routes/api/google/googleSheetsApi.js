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

  apiRouter.get('/createSpreadsheet', (req, res) => {
    oauth2Client.setCredentials({
      access_token: req.query.access_token
    });

    var request = {
      resource: {
        properties: {
          title: req.query.file_name
        },
        sheets: [
          {
            properties: {
              title: 'Transfers'
            }
          },
          {
            properties: {
              title: 'Accounts'
            }
          },
          {
            properties: {
              title: 'Budgets'
            }
          }
        ]
      },
      auth: oauth2Client
    };

    sheets.spreadsheets.create(request, function(err, response) {
      if (err) {
        return handleErrorResponse(res, err);
      }
      return handleResponse(res, _.pick(response, 'spreadsheetId'));
    });

  });

  apiRouter.post('/append', (req, res) => {
    var data = req.body;
    oauth2Client.setCredentials({
      access_token: data.access_token
    });
    var request = {
      spreadsheetId: data.spreadsheet_id,
      range: data.sheet_name,
      valueInputOption: 'RAW',
      resource: {
         values: [data.values]
      },
      auth: oauth2Client
    };

    sheets.spreadsheets.values.append(request, function(err, response) {
      if (err) {
        return handleErrorResponse(res, err);
      }
      return handleResponse(res, response);
    });
  });

  function handleErrorResponse(res, err) {
    if (err.code === 'ETIMEDOUT') {
      return res.status(500).json(err);
    }
    return res.status(err.code).json(err.errors[0]);
  }

  function handleResponse(res, response) {
    return res.json(response);
  }

  return apiRouter;
};
