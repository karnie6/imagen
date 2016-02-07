var React = require('react');
var ReactRouter = require('react-router');
var HTTP = require('./services/httpservice.jsx');
var Link = ReactRouter.Link;
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
    console.log('here');
  },
  render: function() {
    var multipleValue = false;

    var componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true
    //postUrl: '/temp'
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
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: this.onDrop,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecomplete: null
}

//<Dropzone multiple={multipleValue} onDrop={this.onDrop}><div>Either drag a file or click to select one to upload!</div></Dropzone>
//{this.state.files ? <div><h3>Uploaded File: </h3><img width="150" height="150" src={this.state.files[0].preview} /></div> : null}

    return (
      <div>
      <DropzoneComponent config={componentConfig} action="/api/ping/upload"
                             eventHandlers={eventHandlers}
                             djsConfig={djsConfig} />

      {this.state.uploadButtonActive ?
      <button onClick={this.onUpload} className="btn btn-success btn-large">Upload</button>
      : <button onClick={this.onUpload} className="btn btn-success btn-large" disabled="disabled">Upload</button>
      }

      {this.state.justUploaded ?
      <span className="">Successfully Uploaded Image!</span>
      : null
      }

      </div>);
  }
});

module.exports = ImageUploadComponent;
