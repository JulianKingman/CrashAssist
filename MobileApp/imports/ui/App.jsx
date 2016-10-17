import React, { Component } from 'react';

import onsen from 'onsenui';

import {
    Navigator
} from 'react-onsenui';

import Landing from './pages/Landing/Landing.jsx';
import Login from './pages/Login/Login.jsx';
import loginByDeviceId from '../startup/client/accounts.js';

import 'onsenui/css/onsenui.css'
//todo: Custom theme for OnsenUi components. Mainly Android issue here as default iOS styles are ok
/*
 Custom theme can be generated from http://components2.onsen.io
 but currently there is a bug that doesn't transfer layout
 styling for ListItem components causing their elements to
 render stacked instead of side by side.
 */
//import '../startup/client/css/onsen-css-components.css';
import 'onsenui/css/onsen-css-components.css'

export default class App extends Component {

    renderPage(route, navigator) {
        const props = route.props || {};
        this.appContext.navigator = navigator;
        props.appContext = this.appContext;

        let deviceId;
        if(typeof device !== 'undefined'){
            deviceId = device.uuid;
        }

        loginByDeviceId(deviceId, (error)=>{
            if(error){
                navigator.pushPage({component:Login, props:{key:"login"}})
            }
        });

        return React.createElement(route.component, props);
    }
    render() {
        return (
            <Navigator
                appContext={this}
                initialRoute={{component:Landing, props:{key:"landing"}}}
                renderPage={this.renderPage}
                />
        );
    }
}
