var React = require('react');
var ReactRouter = require('react-router');
var Reflux = require('reflux');
var Actions = require('./reflux/action.jsx');
var ImageStore = require('./reflux/image-store.jsx');
var Image = require('./Image.jsx');

var ImagePage = React.createClass({
  mixins:[Reflux.listenTo(ImageStore, 'onImage')],
  getInitialState: function() {
      return {image:null};
  },
  componentWillMount: function() {
    Actions.getImage(this.props.params.imageId);
  },
  onImage: function(event, data) {
    this.setState({image: data});
  },
  render: function() {

      if (this.state.image) {
        return (<Image key={this.state.image._id} fileName={this.state.image.fileName}/>);
      } else {
        return null;
      }

  }
});

module.exports = ImagePage;
