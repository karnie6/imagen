var React = require('react');
var ReactRouter = require('react-router');
var Reflux = require('reflux');
var Actions = require('./reflux/action.jsx');
var ImageStore = require('./reflux/image-store.jsx');
var Image = require('./Image.jsx');

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
      return (<Image key={image._id} id={image._id} fileName={image.fileName} userName={image.userName}/>);
    }
    return (<div>{this.state.images.map(renderImage, this)}</div>);
  }
});

module.exports = ImagesPage;
