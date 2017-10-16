var http = require('request-promise');
var express = require('express');

module.exports = function (config) {
  var googleApi = express.Router();

  googleApi.use('/drive', require('./google/googleDriveApi')(config));
  googleApi.use('/sheets', require('./google/googleSheetsApi')(config));
  googleApi.use('/plus', require('./google/googlePlusApi')(config));

  googleApi.get('/getAccessToken', function (req, res) {
    var options = {
      method: 'POST',
      uri: config.AUTH_TOKEN_URL,
      form: {
        code: req.query.code,
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        redirect_uri: config.REDIRECT_URL,
        grant_type: config.GRANT_TYPE
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };

    http.post(options)
    .then(_handleResponse(res))
    .catch(_handleErrorResponse(res));
  });

  googleApi.get('/isAuthenticated', function (req, res) {
    var options = {
      method: 'GET',
      uri: 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + req.query.access_token,
    };

    http.get(options)
    .then(_handleResponse(res))
    .catch(_handleErrorResponse(res));
  });

  function _handleResponse(res) {
    return function (response) {
      res.json(response);
    }
  }

  function _handleErrorResponse(res) {
    return function (response) {
      res.status(500).json(response.error);
    }
  }

  return googleApi;
};
