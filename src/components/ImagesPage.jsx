var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Reflux = require('reflux');
var Actions = require('./reflux/action.jsx');
var ImageStore = require('./reflux/image-store.jsx');

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
    var listItems = this.state.images.map(function(image) {
        var hrefString = "/image/" + image._id;
        var imageLocationHref = "http://d1zxs15htpm6t7.cloudfront.net/" + image.fileName;
        return <div key={image._id}><a href={hrefString}><img width="150" height="150" src={imageLocationHref}/></a><span>{image.userName}</span></div>;
    });

    return (<div>{listItems}</div>);
  }
});

module.exports = ImagesPage;
