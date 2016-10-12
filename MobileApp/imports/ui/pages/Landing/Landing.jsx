import React, {Component} from 'react';
import {Page, Button, Ripple} from 'react-onsenui';
import onsen from 'onsenui';
import {Incidents, Incident} from '/imports/api/collections/Incidents.js';
import NewIncident from '/imports/ui/pages/NewIncident/NewIncident.jsx';
import PastIncidents from '/imports/ui/pages/PastIncidents/PastIncidents.jsx';
import { Meteor } from 'meteor/meteor';
import loginByDeviceId from '/imports/startup/client/accounts.js';

import './Landing.scss';

export default class Landing extends Component {

    componentDidMount() {
        if (Meteor.userId()) {
            console.log('should be logged in');
        }
    }

    gotoNewIncident = () => {
        if (!Incidents.findOne({completed: false})) {
            if (Meteor.userId()) {
                new Incident().save();
            } else {
                console.log('not logged in!');
                loginByDeviceId(device.uuid);
            }
        }
        this.props.appContext.navigator.pushPage({
            component: NewIncident,
            props: {currentStep: 1, key: "Steps"}
        });
    }

    render() {
        let {navigator} = this.props.appContext;
        let modifier = "large";
        let ripple;


        if (!onsen.platform.isAndroid()) {
            modifier += " outline";
        } else {
            ripple = <Ripple />;
        }

        return (
            <Page key="landing">
                <div id="landing">
                    <h1>Remain Calm, <span>We'll help you through this!</span></h1>
                    <img src="images/crash.svg"/>
                    <Button modifier={modifier}
                            onClick={this.gotoNewIncident}>
                        {ripple}New Incident
                    </Button>
                    <p>In an accident? Start here.</p>
                    <Button modifier='large outline'
                            onClick={()=> navigator.pushPage({
                                component: PastIncidents,
                                props: {key: "PastIncidents"}
                            })}>
                        {ripple}Past Incidents
                    </Button>
                </div>
            </Page>
        );
    }
}
