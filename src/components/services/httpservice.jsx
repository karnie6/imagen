var Fetch = require('whatwg-fetch');
var baseUrl = 'http://localhost:3000';

var service = {
    get: function(url) {
        return fetch(baseUrl + url, {credentials: 'same-origin'})
        .then(function(response) {
            return response.json();
        });
    },
    post: function(url, data) {
      return fetch(baseUrl + url, {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: data
      }).then(function(response) {
        return response;
      });
    }
};

module.exports = service;
