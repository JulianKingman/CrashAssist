import React, { Component } from 'react';
import { Page, Button, Ripple } from 'react-onsenui';
import onsen from 'onsenui';
import NewIncident from '../../pages/NewIncident/NewIncident.jsx';
import './Landing.scss';

export default class Landing extends Component {

    render(){
        let { navigator } = this.props.appContext;
        let modifier = "large";
        let ripple = false;


        if(!onsen.platform.isAndroid()){
            modifier +=  " outline";
        } else {
            ripple = <Ripple />;
        }

        return (
            <Page key="landing">
                <div id="landing">
                    <h1>Remain Calm, <span>We'll help you through this!</span></h1>
                    <img src="images/crash.svg" />
                    <Button modifier={modifier}
                        onClick={() => navigator.pushPage({component:NewIncident, props:{currentStep:1, key:"Steps"}})}>
                        {ripple}New Incident
                    </Button>
                    <p>In an accident? Start here.</p>
                    <Button modifier='large outline' >{ripple}Past Incidents</Button>
                </div>
            </Page>
        );
    }
}
