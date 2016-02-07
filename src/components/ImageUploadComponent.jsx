var React = require('react');
var ReactRouter = require('react-router');
var HTTP = require('./services/httpservice.jsx');
var Link = ReactRouter.Link;
var Reflux = require('reflux');
var Actions = require('./reflux/action.jsx');
var ImageStore = require('./reflux/image-store.jsx');
var Dropzone = require('react-dropzone');
var request = require('superagent');

var ImageUploadComponent = React.createClass({
  mixins:[Reflux.listenTo(ImageStore, 'onChange')],
  getInitialState: function() {
    return {files: "", uploadButtonActive: "disabled"};
  },
  onDrop: function(files) {
    this.setState({files: files, uploadButtonActive: ""});
  },
  onUpload: function(e) {
    e.preventDefault();

    Actions.uploadImage(this.state.files[0]);

  },
  render: function() {
    var multipleValue = false;
    return (
      <div><Dropzone multiple={multipleValue} onDrop={this.onDrop}><div>Either drag a file or click to select one to upload!</div></Dropzone>
      <button onClick={this.onUpload} className="btn btn-success btn-large">Upload</button>
      {this.state.files ? <div><h3>Uploaded File: </h3><img width="150" height="150" src={this.state.files[0].preview} /></div> : null}

      </div>);
  }
});

module.exports = ImageUploadComponent;
