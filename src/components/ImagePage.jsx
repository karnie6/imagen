var React = require('react');
var ReactRouter = require('react-router');
var Reflux = require('reflux');
var Actions = require('./reflux/action.jsx');
var ImageStore = require('./reflux/image-store.jsx');
var Image = require('./Image.jsx');

var ImagePage = React.createClass({
  mixins:[Reflux.listenTo(ImageStore, 'onImage')],
  getInitialState: function() {
      return {image:null, annotations: [], savedAnnotations: false};
  },
  componentWillMount: function() {
    Actions.getImage(this.props.params.imageId);
  },
  onImage: function(event, data) {
    this.setState({image: data, annotations: data.annotations});
    anno.reset();
    anno.makeAnnotatable(document.getElementById('image'));
    anno.addHandler('onAnnotationCreated', this.addAnnotation);

    //draw annotations
    if (data.annotations && data.annotations.length > 0) {
      data.annotations.forEach(function(annotation) {
        anno.addAnnotation(annotation);
      });
    }
  },
  addAnnotation: function(annotationToBeAdded) {
    var currentAnnotations = this.state.annotations;
    currentAnnotations.push(annotationToBeAdded);
    this.setState({annotations: currentAnnotations});
  },
  saveAnnotation: function() {
    this.setState({savedAnnotations: true});
    Actions.saveAnnotations(this.state.image._id, this.state.annotations);
  },
  render: function() {
      if (this.state.image) {
        return (
          <div><Image key={this.state.image._id} fileName={this.state.image.fileName}/>
          <button className="btn btn-success btn-large" onClick={this.saveAnnotation}>Save Annotations</button>
          <div>{this.state.savedAnnotations ? <span className="success-msg">Successfully Saved Annotation(s)!</span> : null}</div>
          </div>);
      } else {
        return null;
      }

  }
});

module.exports = ImagePage;
