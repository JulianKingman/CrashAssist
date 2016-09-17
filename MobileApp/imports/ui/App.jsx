import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import onsen from 'onsenui';

import {
    Navigator
} from 'react-onsenui';

import Landing from './pages/Landing/Landing';

import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
//Custom theme for OnsenUi components
//import '../startup/client/css/onsen-css-components.css';

export default class App extends TrackerReact(Component){

    auth() {
        return Meteor.userId() ? true : false;
    }

    user() {
        let userId = Meteor.userId();

        if (userId) {
            if (Meteor.isServer) {
                return Meteor.users._collection.findOne({_id: userId});
            }
            return Meteor.user();

        } else {
            return null;
        }
    }

    renderPage(route, navigator) {
        const props = route.props || {};
        this.appContext.navigator = navigator;
        props.appContext = this.appContext;

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
