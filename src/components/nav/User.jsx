var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var HTTP = require('../services/httpservice.jsx');
var Reflux = require('reflux');
var Actions = require('../reflux/action.jsx');
var ImageStore = require('../reflux/image-store.jsx');

var User = React.createClass({
  mixins:[Reflux.listenTo(ImageStore, 'onChange')],
  getInitialState: function() {
    return {userName: "", userPic: ""};
  },
  componentWillMount: function() {
    Actions.getUser();
  },
  onChange: function(event, data) {
    this.setState({userName: data.fullname, userPic: data.profilePic});
  },
  render: function() {
    return (
      <li><img src={this.state.userPic}/>{this.state.userName}</li>
    );
  }
});

module.exports = User;
