import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


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

    render() {
        // return React.cloneElement(this.props.children, {...this.props})

        return this.props.children;
    }
}
