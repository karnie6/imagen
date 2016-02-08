var React = require('react');
var ReactRouter = require('react-router');

var Image = React.createClass({
  componentDidMount: function() {
    anno.makeAnnotatable(document.getElementById('image'));
  },
  render: function() {
        var imageLocationHref = "http://d1zxs15htpm6t7.cloudfront.net/" + this.props.fileName;
        return <div key={this.props.id}>
        <img id="image" className="image annotatable" src={imageLocationHref}/>
        </div>;
  }
});

module.exports = Image;
