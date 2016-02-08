var React = require('react');
var ReactRouter = require('react-router');
var Reflux = require('reflux');
var Actions = require('./reflux/action.jsx');
var ImageStore = require('./reflux/image-store.jsx');
var Image = require('./Image.jsx');

var ImagePage = React.createClass({
  mixins:[Reflux.listenTo(ImageStore, 'onChange')],
  getInitialState: function() {
      return {image:[]};
  },
  componentWillMount: function() {
    Actions.getImage();
  },
  onChange: function(event, data) {
    this.setState({image: data});
  },
  render: function() {
    var renderImage = function(image) {
      return (<Image key={image._id} id={image._id} fileName={image.fileName} userName={image.userName}/>);
    }
    return (<div>{this.state.images.map(renderImage, this)}<a href="/upload" className="btn btn-success btn-large">Upload New Image</a></div>);
  }
});

module.exports = ImagesPage;
