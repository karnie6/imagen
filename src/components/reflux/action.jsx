var React = require('react');
var Reflux = require('reflux');

var Actions = Reflux.createActions(['getImages', 'uploadImage', 'getUser', 'getImage']);

module.exports = Actions;
