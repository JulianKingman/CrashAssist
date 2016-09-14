import React from 'react';
import { Route } from 'react-router';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';

import UserRoutes from '../../UserArea/routes';
import AdminRoutes from '../../AdminArea/routes';

ReactRouterSSR.Run(
    <Route>
        {UserRoutes}
        {AdminRoutes}
    </Route>
);
