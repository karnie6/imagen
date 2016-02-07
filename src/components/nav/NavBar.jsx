var React = require('react');
var NavItem = require('./NavItem.jsx');
var ReactRouter = require('react-router');
var User = require('./User.jsx');
var Link = ReactRouter.Link;

var NavBar = React.createClass({
  render: function() {

    var addNavItem = function(navItem, index) {
    return <NavItem key={navItem.title + index} href={navItem.href} title={navItem.title} />;
    }

  return (<div>
     <nav className="navbar navbar-default">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="nav-collapse">
        <ul className="nav navbar-nav">
          {this.props.navData.map(addNavItem)}
        </ul>
        <User/>
      </div>
     </nav>
    </div>);
  }
});

module.exports = NavBar;
