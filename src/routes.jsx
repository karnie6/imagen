var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var browserHistory = ReactRouter.browserHistory;

var BasePage = require('./components/BasePage.jsx');
var ImagesPage = require('./components/ImagesPage.jsx');
var ImageUploadComponent = require('./components/ImageUploadComponent.jsx');
var ImagePage = require('./components/ImagePage.jsx');

var Routes = (
  <Router history={browserHistory}>
    <Route path="/images" component={BasePage} >
     <IndexRoute component={ImagesPage} />
     <Route path="/upload" component={ImageUploadComponent} />
     <Route path="/image/:imageId" component={ImagePage} />
    </Route>
  </Router>

);

module.exports = Routes;
