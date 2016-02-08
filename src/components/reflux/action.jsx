var React = require('react');
var Reflux = require('reflux');

var Actions = Reflux.createActions(['getImages', 'uploadImage', 'getUser', 'getImage', 'saveAnnotations']);

module.exports = Actions;
