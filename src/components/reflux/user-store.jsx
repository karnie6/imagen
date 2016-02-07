var HTTP = require('../services/httpservice.jsx');
var Reflux = require('reflux');
var Actions = require('./action.jsx');
var request = require('superagent');

var UserStore = Reflux.createStore({
  listenables: [Actions],

  getUser: function() {
    HTTP.get('/api/user')
    .then(function(data) {
      this.user = data;
      this.fireUserUpdate();
    }.bind(this));
  },

  //refresh function
  fireUserUpdate: function() {
    this.trigger('userAction', this.user);
  }
});

module.exports = UserStore;
