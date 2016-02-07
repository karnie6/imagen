var React = require('react');
var ReactRouter = require('react-router');
var HTTP = require('./services/httpservice.jsx');
var Reflux = require('reflux');
var Actions = require('./reflux/action.jsx');
var ImageStore = require('./reflux/image-store.jsx');
var Dropzone = require('react-dropzone');
var DropzoneComponent = require('react-dropzone-component');
var request = require('superagent');

var ImageUploadComponent = React.createClass({
  mixins:[Reflux.listenTo(ImageStore, 'onChange')],
  getInitialState: function() {
    return {files: "", uploadButtonActive: false, justUploaded: false};
  },
  onDrop: function(files) {
    this.setState({files: files, uploadButtonActive: true, justUploaded: false});
  },
  onUpload: function(e) {
    e.preventDefault();
    Actions.uploadImage(this.state.files);
    this.setState({justUploaded: true});
  },
  onChange: function() {
  },
  render: function() {
    var componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true
    };

    var djsConfig = {
      addRemoveLinks: true,
      uploadMultiple: false,
      acceptedFiles: "image/jpeg,image/png,image/gif"
    };

    var eventHandlers = {
      // This one receives the dropzone object as the first parameter
      // and can be used to additional work with the dropzone.js
      // object
      init: null,
      // All of these receive the event as first parameter:
      drop: this.onDrop,
      addedfile: this.onDrop
    };

    return (
      <div>
      <div className="filepicker">
      <DropzoneComponent config={componentConfig} action="/api/ping/upload"
                             eventHandlers={eventHandlers}
                             djsConfig={djsConfig} />

      {this.state.uploadButtonActive ?
      <button onClick={this.onUpload} className="uploadButton btn btn-success btn-large">Upload</button>
      : <button onClick={this.onUpload} className="uploadButton btn btn-success btn-large" disabled="disabled">Upload</button>
      }
      </div>

      <div>{this.state.justUploaded ? <span className="success-msg">Successfully Uploaded Image!</span> : null}</div>
      </div>);
  }
});

module.exports = ImageUploadComponent;
