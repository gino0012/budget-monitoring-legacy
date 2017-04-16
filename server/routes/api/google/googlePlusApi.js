var express = require('express');
var google = require('googleapis');

var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;

module.exports = function (config) {
  var apiRouter = express.Router();
  var oauth2Client = new OAuth2(
    config.CLIENT_ID,
    config.CLIENT_SECRET,
    config.REDIRECT_URL
  );

  apiRouter.get('/getUserInfo', (req, res) => {
    oauth2Client.setCredentials({
      access_token: req.query.access_token
    });

    var request = {
      userId: 'me'  ,
      auth: oauth2Client
    };

    plus.people.get(request, function(err, response) {
      if (err) {
        return handleErrorResponse(res, err);
      }
      return handleResponse(res, response);
    });

  });

  function handleErrorResponse(res, err) {
    if (err.code === 'ETIMEDOUT' || !err.errors) {
      return res.status(500).json(err);
    }
    return res.status(err.code).json(err.errors[0]);
  }

  function handleResponse(res, response) {
    return res.json(response);
  }

  return apiRouter;
};
