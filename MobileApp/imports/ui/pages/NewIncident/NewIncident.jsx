import React, {Component} from 'react';
import {Page, Toolbar, BackButton, ToolbarButton} from 'react-onsenui';
import StepNav from '/imports/ui/components/StepNav/StepNav.jsx';
import Accordions from '/imports/ui/components/Accordion/Accordions.jsx';
import {Users, User} from '/imports/api/collections/Users.js';
import {Incidents, Incident} from '/imports/api/collections/Incidents.js';

import pageSchema from '/imports/api/page-schema.js'

import './NewIncident.scss';

export default class NewIncident extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: this.props.currentStep
        }
    }

    nextStep = () => {
        if (this.state.currentStep < pageSchema.length) {
            this.setState({currentStep: this.state.currentStep + 1, activeAccordion: 0});
        }
    }

    prevStep = () => {
        if (this.state.currentStep > 1) {
            this.setState({currentStep: this.state.currentStep - 1, activeAccordion: 0});
        }
    }

    currentStepData() {
        return pageSchema[this.state.currentStep - 1];
    }

    renderAccordions() {
        let currentStep = pageSchema[this.state.currentStep - 1];

        return currentStep.accordions.map((accordion, index) => {
            let key = `${this.state.currentStep}-${index}`;

            return <Accordion key={key} title={accordion.title} text={accordion.text}/>
        });
    }

    componentDidMount(){
        // console.log(Incidents.simpleSchema().pick(['driverInfo']));
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className="left">
                    <BackButton>
                        Home
                    </BackButton>
                </div>
                <div className="center">
                    9/18/2016 Incident
                </div>
                <div className="right">
                    <ToolbarButton>
                        Rename
                    </ToolbarButton>
                </div>
            </Toolbar>
        );
    }

    render() {
        console.log(this.currentStepData());
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div id="new-incident">
                    <Accordions data={this.currentStepData()} defaultAccordion="0"/>
                    {/*<div id="accordions">*/}
                    {/*{this.renderAccordions()}*/}
                    {/*</div>*/}
                    <StepNav
                        steps={pageSchema}
                        currentStep={this.state.currentStep}
                        prev={this.prevStep}
                        next={this.nextStep}
                    />
                </div>
            </Page>
        );
    }
}
