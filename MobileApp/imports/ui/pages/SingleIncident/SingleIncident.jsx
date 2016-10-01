import React, { Component } from 'react';
import { Page, Toolbar, BackButton, List, ListItem } from 'react-onsenui';
import { createContainer } from 'meteor/react-meteor-data';
import { Incidents } from '/imports/api/collections/Incidents.js';

class SingleIncident extends Component {
    renderToolbar = () => {
        return (
            <Toolbar>
                <div className="left">
                    <BackButton>
                        Back
                    </BackButton>
                </div>
                <div className="center">
                    {this.props.incident.title}
                </div>
            </Toolbar>
        );
    }
    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>

            </Page>
        );
    }
}

export default SingleIncidentContainer = createContainer((props)=>{
    const { _id } = props;

    const singleIncidentHandle = Meteor.subscribe("SingleIncident", _id);
    const ready = singleIncidentHandle.ready();
    const incident = Incidents.findOne(_id)

    return {
        singleIncidentHandle,
        ready,
        incident
    }
}, SingleIncident);
