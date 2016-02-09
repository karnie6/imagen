var React = require('react');
var ReactRouter = require('react-router');

var ThumbnailImage = React.createClass({
  render: function() {
        var hrefString = "/image/" + this.props.id;
        var imageLocationHref = "http://d1zxs15htpm6t7.cloudfront.net/" + this.props.fileName;
        return <tr key={this.props.id}><td className="thumbnailImage thumbnailImage-td" key={this.props.id}><a href={hrefString}>
        <img maxWidth="200" height="200" src={imageLocationHref}/></a>
        <div className="imageUploader">Uploaded by {this.props.userName}</div></td>
        <td className="annotationButton-td"><a href={hrefString} className="btn btn-primary btn-large">Annotate</a></td></tr>;
  }
});

module.exports = ThumbnailImage;
