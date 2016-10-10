import React from 'react';
import ReactDOM from 'react-dom';
import App from '/imports/ui/App.jsx';
import { Meteor } from 'meteor/meteor';

import loginByDeviceId from '/imports/startup/client/accounts.js';

Meteor.startup(() => {
    let deviceId;
    if(typeof device !== 'undefined'){
        deviceId = device.uuid;
    }

    loginByDeviceId(deviceId);

    ReactDOM.render(<App/>, document.getElementById("react-app"));
});
