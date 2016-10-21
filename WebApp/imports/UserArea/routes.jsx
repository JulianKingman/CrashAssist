import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../ui/App.jsx';
import Landing from './ui/pages/Landing/Landing.jsx';
import IncidentList from './ui/pages/Incidents/Incidents.jsx';
import IncidentSingle from './ui/pages/Incidents/Incident.jsx';
import PrivacyPolicy from './ui/pages/PrivacyPolicy/PrivacyPolicy.jsx';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={Landing} />
        <Route path="incidents" component={IncidentList}>
            <Route path="incidents/:incidentId" component={IncidentSingle}/>
        </Route>
        <Route path="privacy-policy" component={PrivacyPolicy}/>
        <Route path="*"/>
    </Route>
);