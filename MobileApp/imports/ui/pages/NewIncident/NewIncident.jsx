import React, { Component } from 'react';
import { Page, Toolbar, BackButton, ToolbarButton } from 'react-onsenui';
import StepNav from '/imports/ui/components/StepNav/StepNav.jsx';
import Accordion from '/imports/ui/components/Accordion/Accordion.jsx';

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
        if(this.state.currentStep < pageSchema.length){
            this.setState({currentStep:this.state.currentStep+1});
        }
    }

    prevStep = () => {
        if(this.state.currentStep > 1){
            this.setState({currentStep:this.state.currentStep-1});
        }
    }

    renderAccordions() {
        let currentStep = pageSchema[this.state.currentStep-1];

        return currentStep.accordions.map((accordion, index) => {
            let key = `${this.state.currentStep}-${index}`;

            return  <Accordion key={key} title={accordion.title} text={accordion.text} />
        });
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
    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div id="new-incident">
                    <div id="accordions">
                        {this.renderAccordions()}
                    </div>
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
