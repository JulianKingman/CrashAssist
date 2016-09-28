import React, { Component } from 'react';
import Accordion from '/imports/ui/components/Accordion/Accordion.jsx';
import { Page, Toolbar, BackButton, ListItem, List } from 'react-onsenui';
import { createContainer } from 'meteor/react-meteor-data';
import { UserIncidents } from '/imports/api/collections/UserIncidents';

class PastIncidents extends Component {
    renderToolbar() {
        return (
            <Toolbar>
                <div className="left">
                    <BackButton>
                        Back
                    </BackButton>
                </div>
                <div className="center">
                    Past Incidents
                </div>
            </Toolbar>
        );
    }
    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <List
                    dataSource={this.props.pastIncidents}
                    renderRow={(incident) =>
                        <ListItem key={incident._id} modifier="chevron" tappable >
                            <div className="center">{incident.title}</div>
                        </ListItem>
                    }
                />
            </Page>
        );
    }
}

export default PastIncidentsContainer = createContainer(() => {
    const pastIncidentsHandle = Meteor.subscribe('UserIncidents');
    const loading = !pastIncidentsHandle.ready();
    const pastIncidents = UserIncidents.find().fetch();

    return {
        pastIncidentsHandle,
        loading,
        pastIncidents
    }
}, PastIncidents);
