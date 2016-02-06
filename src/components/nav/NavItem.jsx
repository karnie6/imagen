var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var NavItem = React.createClass({
  getInitialState: function() {
    return {hover: false};
  },
  mouseOver: function() {
    this.setState({hover: true});
  },
  mouseOut: function() {
    this.setState({hover: false});
  },
  render: function() {
    return (
      <li className= {this.state.hover ? "active" : ""} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
      <Link to={this.props.href}>{this.props.title}</Link></li>
    );
  }
});

module.exports = NavItem;
