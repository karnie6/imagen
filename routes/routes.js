module.exports = function(express, app, passport){
	var router = express.Router();

	router.get('/', function(req, res, next){
		res.render('index', {
		});
	});

	function securePages(req, res, next) {
		if(req.isAuthenticated()) {
			next();
		} else {
			res.redirect('/');
		}
	};


	app.use('/', router);
}
