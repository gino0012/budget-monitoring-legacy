var http = require('request-promise');

var express = require('express');


module.exports = function () {
  var googleApi = express.Router();

  googleApi.get('/access', (req, res) => {
    var options = {
      method: 'POST',
      uri: 'https://accounts.google.com/o/oauth2/token',
      form: {
        code: '4/gXCN77EWLDCO_fake_p2tvfakezOg6Mn0fakej2vA.giyP3fakejxeAeYFZr95uygvU3j0dumQI',
        client_id: '104608secret-secret-secret-secret.apps.googleusercontent.com',
        client_secret: '90V0FAKE_WkFAKExrHCZti',
        redirect_uri: 'postmessage',
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };

  http.post(options).then((res) => {
    console.log(res);
  }).catch(error => {
      console.log(error.error);
  });
    res.send('api works');
  });

  return googleApi;
};
