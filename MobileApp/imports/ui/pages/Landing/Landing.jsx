import React, { Component } from 'react';
import { Page, Button } from 'react-onsenui';

import './Landing.scss';

export default class Landing extends Component {
    render(){
        return (
            <Page key="landing">
                <div id="landing">
                    <h1>Remain Calm, <span>We'll help you through this!</span></h1>
                    <img src="images/crash.svg" />
                    <Button modifier="large outline">New Incident</Button>
                    <p>In an accident? Start here.</p>
                    <Button modifier="large outline">Past Incidents</Button>
                </div>
            </Page>
        );
    }
}
