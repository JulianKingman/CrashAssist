// https://meteor.programmingpedia.net/en/tutorial/10114/meteor-plus-react-plus-reactrouter
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
// import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr'; doesn't work anymore... conflicting packages
import { createHistory } from 'history';

import UserRoutes from '../../UserArea/routes';
import AdminRoutes from '../../AdminArea/routes';

const browserHistory = createHistory();

// ReactRouterSSR.Run(
{
  /* <Route> */
}
export const Routes = () => (
  <Router history={browserHistory}>
    {UserRoutes}
    {AdminRoutes}
  </Router>
);
{
  /* </Route> */
}
// );

Meteor.startup(() => {
  ReactDOM.render(<Routes />, document.body);
});
