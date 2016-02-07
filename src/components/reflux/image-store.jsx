var HTTP = require('../services/httpservice.jsx');
var Reflux = require('reflux');
var Actions = require('./action.jsx');
var request = require('superagent');

var ImageStore = Reflux.createStore({
  listenables: [Actions],
  getImages: function() {

    this.images = [];

    HTTP.get('/api/getImages')
    .then(function(data) {
      var pokemonData = data.pokemon.map(function(pokemon) {
          HTTP.get(pokemon.resource_uri)
          .then(function(data) {
              var pokemonEntry = {"id": data.pkdx_id, "name": data.name};
              this.pokemons.push(pokemonEntry);
              this.fireUpdate();
          }.bind(this));
      }.bind(this));

    }.bind(this));
  },
  getUser: function() {
    HTTP.get('/user')
    .then(function(data) {
      this.user = data;
      this.fireUserUpdate();
    }.bind(this));
  },
  uploadImage: function(fileData) {
    console.log("uploading..", fileData.name);
    var req = request.post('/api/image/upload');
    req.attach('upload', fileData)
    .set('Accept', 'application/json')
    .set('credentials', 'same-origin')
  .end(function(err, res){
    console.log('uploaded..' + res);
    //todo: trigger an update
  });

  },
  //refresh function
  fireUpdate: function() {
    this.trigger('change', this.pokemons);
  },
  fireUserUpdate: function() {
    this.trigger('change', this.user);
  }
});

module.exports = ImageStore;
