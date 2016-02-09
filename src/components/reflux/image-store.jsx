var HTTP = require('../services/httpservice.jsx');
var Reflux = require('reflux');
var Actions = require('./action.jsx');
var request = require('superagent');

var ImageStore = Reflux.createStore({
  listenables: [Actions],
  init: function() {
    this.images = [];
  },
  getImage: function(imageId) {
    this.image = {};
    HTTP.get('/api/image/' + imageId )
    .then(function(data) {
      if (data) {
             this.image = data[0];
             this.fireImageUpdate();
      }
    }.bind(this));
  },
  getImages: function() {
    this.images = [];
    HTTP.get('/api/images')
    .then(function(data) {
      var imageData = data.map(function(image) {
              this.images.push(image);
              this.fireImagesUpdate();

      }.bind(this));
    }.bind(this));
  },
  saveAnnotations: function(imageId, annotations) {
    //var imageAnnotation = {imageId: imageId, annotation: annotation};
    HTTP.post('/api/image/' + imageId + '/annotation', JSON.stringify(annotations))
    .then(function(data) {
      //image annotation has been saved, we could fire a trigger here
    });
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
      this.fireImagesUpdate();
    }

  }.bind(this));

  },
  //refresh function
  fireUserUpdate: function() {
    this.trigger('userAction', this.user);
  },
  fireImagesUpdate: function() {
    this.trigger('change', this.images);
  },
  fireImageUpdate: function() {
    this.trigger('image', this.image);
  }
});

module.exports = ImageStore;
