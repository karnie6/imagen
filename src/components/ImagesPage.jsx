var React = require('react');
var ReactRouter = require('react-router');
var Reflux = require('reflux');
var Actions = require('./reflux/action.jsx');
var ImageStore = require('./reflux/image-store.jsx');
var ThumbnailImage = require('./ThumbnailImage.jsx');

var ImagesPage = React.createClass({
  mixins:[Reflux.listenTo(ImageStore, 'onChange')],
  getInitialState: function() {
      return {images:[]};
  },
  componentWillMount: function() {
    Actions.getImages();
  },
  onChange: function(event, data) {
    this.setState({images: data});
  },
  render: function() {
    var renderImage = function(image) {
      return (<table><tbody><ThumbnailImage key={image._id} id={image._id} fileName={image.fileName} userName={image.userName}/></tbody></table>);
    }
    return (<div>{this.state.images.map(renderImage, this)}<a href="/upload" className="btn btn-success btn-large">Upload New Image</a></div>);
  }
});

module.exports = ImagesPage;
