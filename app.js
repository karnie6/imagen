var express = require('express');
	app = express(),
	path = require('path'),
	config = require('./config/config.js'),
	session = require('express-session'),
	ConnectMongo = require('connect-mongo')(session),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
	knox = require('knox'),
	fs = require('fs'),
	os = require('os'),
	bodyparser = require('body-parser'),
	formidable = require('formidable'),
	mongoose = require('mongoose').connect(config.dbURL),
  FacebookStrategy = require('passport-facebook').Strategy,
	querystring = require('querystring'),
	request = require('request');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

var env = process.env.NODE_ENV || 'development';
var env = "production";

if (env === 'development') {
	//dev specific settings
	app.use(session({secret:config.sessionSecret, saveUninitialized:true, resave:true}));
} else {
	//production specific settings
	app.use(session({secret:config.sessionSecret,
	saveUninitialized:true,
	resave:true,
	store: new ConnectMongo({
			mongoose_connection:mongoose.connections[0],
			stringify:true
		})
	}));
}

app.use(passport.initialize());
app.use(passport.session());

var imagenImage = new mongoose.Schema({
	fileName:String,
	userName: String,
	annotations: Array
});

var imagenImageModel = mongoose.model('imagenImage', imagenImage);

require('./auth/passportAuth.js')(passport, FacebookStrategy, config, mongoose);

require('./routes/routes.js')(express, app, bodyparser, passport, knox, fs, os, formidable, imagenImageModel);

app.set('port', process.env.PORT || 3000);
var server = require('http').createServer(app);

server.listen(app.get('port'), function() {
	console.log("Our server is running on port " + app.get('port'));
});
