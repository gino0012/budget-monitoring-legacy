var http = require('request-promise');

var express = require('express');


module.exports = function () {
  var googleApi = express.Router();

  googleApi.get('/getAccessToken', (req, res) => {
    var options = {
      method: 'POST',
      uri: 'https://accounts.google.com/o/oauth2/token',
      form: {
        code: req.query.code,
        client_id: '861770303263-nhmpmupmg7je2d3u76714ij8dun527up.apps.googleusercontent.com',
        client_secret: 'fZtFjpzDmsm0ZWTxYOVnj94Z',
        redirect_uri: 'postmessage',
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };

    http.post(options)
    .then(_handleResponse(res))
    .catch(_handleErrorResponse(res));
  });

  function _handleResponse(res) {
    return (response) => {
      res.json(response);
    }
  }

  function _handleErrorResponse(res) {
    return (response) => {
      res.status(500).json(response.error);
    }
  }

  return googleApi;
};
