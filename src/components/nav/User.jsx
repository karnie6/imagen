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
    Actions.getUser();
  },
  onUserAction: function(event, data) {
    this.setState({userName: data.fullname, userPic: data.profilePic});
  },
  render: function() {
    return (
      <div className="user"><img src={this.state.userPic}/><span className="userName">{this.state.userName}</span></div>
    );
  }
});

module.exports = User;
