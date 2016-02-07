var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var HTTP = require('../services/httpservice.jsx');
var Reflux = require('reflux');
var Actions = require('../reflux/action.jsx');
var UserStore = require('../reflux/user-store.jsx');

var User = React.createClass({
  mixins:[Reflux.listenTo(UserStore, 'onUserAction')],
  getInitialState: function() {
    return {userName: "", userPic: ""};
  },
  componentWillMount: function() {
    console.log('here1');
    Actions.getUser();
  },
  onUserAction: function(event, data) {
    console.log('here2');

    this.setState({userName: data.fullname, userPic: data.profilePic});
  },
  render: function() {
    return (
      <li><img src={this.state.userPic}/>{this.state.userName}</li>
    );
  }
});

module.exports = User;
