var React = require('react');
var ReactRouter = require('react-router');

var Image = React.createClass({
  render: function() {
        var hrefString = "/image/" + this.props.id;
        var imageLocationHref = "http://d1zxs15htpm6t7.cloudfront.net/" + this.props.fileName;
        return <div key={this.props.id}><a href={hrefString}><img width="150" height="150" src={imageLocationHref}/></a><span>{this.props.userName}</span></div>;
  }
});

module.exports = Image;
