var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var browserHistory = ReactRouter.browserHistory;

var CreateHistory = require('history/lib/createHashHistory');

var History = new CreateHistory({
  queryKey: false
});

var BasePage = require('./components/BasePage.jsx');
var ImagesPage = require('./components/ImagesPage.jsx');
//var ImagePage = require('./components/ImagePage.jsx');
//<Route path="/image/:imageId" component={ImagePage} />

var Routes = (
  <Router history={History}>
    <Route path="/" component={BasePage} >
     <IndexRoute component={ImagesPage} />
    </Route>
  </Router>

);


//var Routes = (
//<Router>
//</Router>

//  <Router history={browserHistory}>
//  <Route path="/" component={Base}></R

//  </Route>
//  </Router>
//);


module.exports = Routes;
