import React, {Component} from 'react';
import {Page, Toolbar, BackButton, ToolbarButton} from 'react-onsenui';
import StepNav from '/imports/ui/components/StepNav/StepNav.jsx';
import NewIncidentSuccess from '/imports/ui/pages/NewIncidentSuccess/NewIncidentSuccess.jsx';
import Accordions from '/imports/ui/components/Accordion/Accordions.jsx';
import {Users, User} from '/imports/api/collections/Users.js';
import {Incidents, Incident} from '/imports/api/collections/Incidents.js';
import { createContainer } from 'meteor/react-meteor-data';

import pageSchema from '/imports/api/page-schema.js'

import './NewIncident.scss';

class NewIncident extends Component {
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

    finishSteps = () => {
        this.props.appContext.navigator.replacePage({component:NewIncidentSuccess, props:{key:"Success"}}, {callback:()=>{
            this.props.incident.markCompleted();
        }});

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

    componentDidMount() {
        // console.log(Incidents.simpleSchema().pick(['driverInfo', 'driverInfo.name']))
    }

    rename = ()=>{
        var newName = prompt('Use a concise, descriptive title to name your incident');
        Incidents.update({_id: this.props.incident._id}, {$set: {title: newName}});
    };

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className="left">
                    <BackButton>
                        Home
                    </BackButton>
                </div>
                <div className="center">
                    {this.props.incident.title}
                </div>
                <div className="right">
                    <ToolbarButton onClick={()=>{this.rename()}}>
                        Rename
                    </ToolbarButton>
                </div>
            </Toolbar>
        );
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div id="new-incident">
                    <Accordions data={this.currentStepData()} defaultAccordion="0" incident={this.props.incident}/>
                    <StepNav
                        steps={pageSchema}
                        currentStep={this.state.currentStep}
                        prev={this.prevStep}
                        next={this.nextStep}
                        finish={this.finishSteps}
                    />
                </div>
            </Page>
        );
    }
}

export default NewIncidentContainer = createContainer((props)=>{
    const { incidentId } = props;

    let incident;

    //if we supply an incidentId we can use this to edit an incident
    if(incidentId){
        Meteor.subscribe('SingleIncident', incidentId);
        incident = Incidents.findOne(incidentId);
    }else{
        incident = Incidents.findOne({completed:false});
    }

    return {
        incident
    }
}, NewIncident);
