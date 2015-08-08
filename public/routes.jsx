var React = require('react');
var ReactRouter = require('react-router');
//object that tells the router how we will keep track of where the user is
var HashHistory = require('react-router/lib/HashHistory');
//what to show on the page at any given time
var Router = ReactRouter.Router;
//object used to configure the router
var Route = ReactRouter.Route;
var Main = require('./components/main');

module.exports = (
  <Router history={new HashHistory}>
    <Route path="/" component={Main}>
      <Route path="/signup" component={Main} />
    </Route>
  </Router>
);