var express = require('express');
	app = express(),
	path = require('path'),
	session = require('express-session'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;
//  config = require('./config/config.js'),

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

require('./routes/routes.js')(express, app, passport);


app.set('port', process.env.PORT || 3000);
var server = require('http').createServer(app);

server.listen(app.get('port'), function() {
	console.log("Our server is running on port " + app.get('port'));
})
