module.exports = function(express, app, passport){
	var router = express.Router();

	router.get('/', function(req, res, next){
		res.render('index', {
		});
	});

 //need to add securePages to this route
	router.get('/images', securePages, function(req, res, next){
		console.log("HERE2");
		res.render('index2', {
		});
	});

	//to get user
	router.get('/user', function(req, res, next) {
		console.log("User Info requested: " + JSON.stringify(req.user));
		res.send(JSON.stringify(req.user));
	});

	function securePages(req, res, next) {
		if(req.isAuthenticated()) {
			next();
		} else {
			res.redirect('/');
		}
	};

	router.get('/auth/facebook', passport.authenticate('facebook'));
	router.get('/auth/facebook/callback', passport.authenticate('facebook', {
		sucessRedirect:'/images',
		failureRedirect:'/'
	}));


	app.use('/', router);
}
