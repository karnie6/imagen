var HTTP = require('../services/httpservice.jsx');
var Reflux = require('reflux');
var Actions = require('./action.jsx');
var request = require('superagent');

var ImageStore = Reflux.createStore({
  listenables: [Actions],
  init: function() {
    this.images = [];
  },
  getImages: function() {
    this.images = [];
    HTTP.get('/api/images')
    .then(function(data) {
      var imageData = data.map(function(image) {
              this.images.push(image);
              this.fireImageUpdate();

      }.bind(this));
    }.bind(this));
  },
  uploadImage: function(fileData) {
    console.log("uploading..", fileData.name);
    var req = request.post('/api/image/upload');
    req.attach('upload', fileData)
    .set('Accept', 'application/json')
  .end(function(err, res){
    if (!err && res.statusCode == 200) {
      //it was successful, push an image on to images & fire an update
      var newImage = res.text;
      this.images.push(newImage);
      this.fireImageUpdate();
    }

  }.bind(this));

  },
  //refresh function
  fireUserUpdate: function() {
    this.trigger('userAction', this.user);
  },
  fireImageUpdate: function() {
    this.trigger('change', this.images);
  }
});

module.exports = ImageStore;
