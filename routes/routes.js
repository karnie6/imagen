module.exports = function(express, app, bodyparser, passport, knox, fs, os, formidable, imagenImageModel){
	var router = express.Router();

	//this is for karthik's education tutoring prototype - can be removed if needed
	router.post('/message', function(req, res, next) {
	//	console.log(req.body);

		if (req.body && req.body.user_name != 'slackbot' && req.body.bot_name != 'incoming-webhook') {
			request.post('https://sweltering-heat-2285.firebaseio.com/messages.json', {
				json: {
				"imageUrl": "",
				"sender": "Slack",
				"text": req.body.text} }, function(error, response, body) {});
			res.end();
		}
	});

	//go directly to /images
	router.get('/', function(req, res, next) {
		res.redirect('/images');
	});

	router.get('/login', function(req, res, next){
		res.render('login', {
		});
	});

	//route for client side app to search main images page
	router.get('/images', securePages, function(req, res, next){
		res.render('index', {
		});
	});

	router.get('/image/:imageId', securePages, function(req, res, next){
		res.render('index', {
		});
	});

	router.get('/upload', securePages, function(req, res, next){
		res.render('index', {
		});
	});

  //if trying to access a page that needs login and not authenticated, redirect to login page.
	function securePages(req, res, next) {
		if(req.isAuthenticated()) {
			next();
		} else {
			res.redirect('/login');
		}
	};

	//api routes for client side app to get data (user + images)
	router.get('/api/user', function(req, res, next) {
		res.send(JSON.stringify(req.user));
	});

	router.get('/api/image/:imageId', function(req, res, next) {
		imagenImageModel.find({_id: req.param("imageId")}, function(error, result) {
			res.send(JSON.stringify(result));
		});
	});

	router.get('/api/images', function(req, res, next) {
		imagenImageModel.find({}, function(error, result) {
			res.send(JSON.stringify(result));
		});
	});

	//dummy post api to  place nicely with file uploader
	router.post('/api/ping/upload', function(req, res, next) {
		res.send({});
	});

	router.post('/api/image/:imageId/annotation', function(req, res, next) {
		var annotations = req.body;
		var imageId = req.param("imageId");

		imagenImageModel.findOne({ _id: imageId }, function (err, doc){
  		doc.annotations = annotations;
  		doc.save();
		});

		res.writeHead(200, {'Content-type':'text/plain'});
		res.end();
	});

	//route to handle image upload
	router.post('/api/image/upload', function(req, res, next) {

		//function to generate unique filename so that we don't have collisions on S3
		function generateFilename(filename) {
			var charBank = "abcdefghi";
			var fstring = filename + '_';

			for(var i = 0; i < 10; i++) {
				fstring += charBank[parseInt(Math.random()*9)];
			}
			//return filename;
			return fstring + '.jpg';
		}

		var tmpFile, nfile, fname;
		var userName = req.user.fullname;
		var newForm = new formidable.IncomingForm();
		newForm.keepExtensions = true;
		newForm.parse(req, function(err, fields, files) {
			tmpFile = files.upload.path;
			fname = generateFilename(files.upload.name);
			nfile = os.tmpDir() + '/' + fname;

		});

		newForm.on('end', function() {
			fs.rename(tmpFile, nfile, function(){
				fs.readFile(nfile, function(err, buf) {
					//store file on S3
					var req = knoxClient.put(fname, {
						'Content-Length':buf.length,
						'Content-Type':'image/jpeg'
					});

					//if successfully saved on S3, let's save it in the DB
					req.on('response', function(s3response) {
						if (s3response.statusCode == 200) {
							var newImage = new imagenImageModel({
								fileName: fname,
								userName: userName,
								annotations: []
							}).save();

							res.send({fileName: fname, userName: userName});
							res.end();

							fs.unlink(nfile, function() {
								console.log('Local File Deleted');
							});
						}
					});

					req.end(buf);
				});
			});
		});
	});

	router.get('/auth/facebook', passport.authenticate('facebook'));
	router.get('/auth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect:'/login'}),
		function(req, res) {
				//Successful authentication, let's redirect to images
				res.redirect('/images');
		});

	var knoxClient = knox.createClient({
		key: "AKIAI3OFQVPHWZ54WL6A",
		secret: "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",
		bucket: "photogrid-ks"
	});

	app.use(bodyparser.json());
	app.use(bodyparser.urlencoded({extended: false}));
	app.use('/', router);
};
