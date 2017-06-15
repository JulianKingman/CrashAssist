import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../ui/App.jsx';
import Landing from './ui/pages/Landing/Landing.jsx';

export default (
    <Route path="/admin" component={App} >
        <IndexRoute component={Landing} />
    </Route>
);
