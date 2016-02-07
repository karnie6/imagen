module.exports = function(express, app, passport, knox, fs, os, formidable, imagenImageModel){
	var router = express.Router();

	router.get('/', function(req, res, next){
		res.render('index', {
		});
	});

	router.get('/images', securePages, function(req, res, next){
	//	console.log("HERE2");
		res.render('index2', {
		});
	});

	//route to get user info
	router.get('/user', function(req, res, next) {
	//	console.log("User Info requested: " + JSON.stringify(req.user));
		res.send(JSON.stringify(req.user));
	});

	function securePages(req, res, next) {
		if(req.isAuthenticated()) {
			next();
		} else {
			res.redirect('/');
		}
	};

	router.post('/api/ping/upload', function(req, res, next) {
		res.send({});
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
				req.on('response', function(res) {
					console.log(fname);
					if (res.statusCode == 200) {
						var newImage = new imagenImageModel({
							fileName: fname,
							userName: userName
						}).save();

					fs.unlink(nfile, function() {
						console.log('Local File Deleted');
					});

					}
				});

				req.end(buf);

			});
		});
	});

	res.writeHead(200, {'Content-type':'text/plain'});
	res.end();
	});

	router.get('/auth/facebook', passport.authenticate('facebook'));
	router.get('/auth/facebook/callback', passport.authenticate('facebook', {
		sucessRedirect:'/images',
		failureRedirect:'/'
	}));

	var knoxClient = knox.createClient({
		key: "AKIAJIYZPWJHHHF5PWVQ",
		secret: "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",
		bucket: "photogrid-ks"
	});

	app.use('/', router);
}
