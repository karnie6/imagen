var Fetch = require('whatwg-fetch');
var baseUrl = '';

var service = {
    get: function(url) {
        return fetch(baseUrl + url, {credentials: 'same-origin'})
        .then(function(response) {
            return response.json();
        });
    },
    post: function(url, data) {
      console.log(data);
      return fetch(baseUrl + url, {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json',
          'credentials': 'same-origin'
        },
        method: 'post',
        body: data
      }).then(function(response) {
        return response;
      });
    }
};

module.exports = service;
