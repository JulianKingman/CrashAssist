import React, {Component} from 'react';
import {Page, Toolbar, ToolbarButton, BackButton, List, ListItem, ListHeader} from 'react-onsenui';
import {createContainer} from 'meteor/react-meteor-data';
import {Incidents} from '/imports/shared/collections/Incidents.js';
import _ from 'underscore';
import NewIncident from '/imports/ui/pages/NewIncident/NewIncident.jsx';

import pageSchema from '/imports/shared/page-schema.js';

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
                <div className="right">
                    <ToolbarButton onClick={this.editIncident}>
                        Edit
                    </ToolbarButton>
                </div>
            </Toolbar>
        );
    };

    editIncident = ()=> {
        this.props.appContext.navigator.pushPage({
            component: NewIncident,
            props: {currentStep: 1, key: "Steps", incidentId: this.props.incident._id}
        });
    };

    renderField = (field, index)=> {
        console.log(`field ${field.name} of type ${field.type}`);
        if (field.type === "photo") {
            return (
                <ListItem key={`item-${index}`}>Photos go here</ListItem>
            )
        } else if (field.type === "array") {
            if (this.props.incident[field.name]) {
                //getting the array of field value groups, i.e. fieldGroup.$
                this.props.incident[field.name].map((fieldset, arrayIndex)=> {
                    _.map(fieldset, (value, label)=> {
                        //getting the fields, e.g. fieldGroup.$.field
                        return (
                            <ListItem key={`item-${index}-${arrayIndex}`}>
                                <div className="left">{label}</div>
                                <div className="center"> value</div>
                            </ListItem>
                        )
                    });
                });
            }
        } else {
            let explodeField = field.name.split('.');
            if (this.props.incident[explodeField[0]]) {
                return (
                    <ListItem key={`item-${index}`}>
                        <div className="left">{field.label}</div>
                        <div className="center">{this.props.incident[explodeField[0]][explodeField[1]]}</div>
                    </ListItem>
                )
            }
        }
    };


    render() {
        const accordions = _.flatten(_.pluck(pageSchema, 'accordions'), true);
        console.log(accordions);
        return (
            <Page renderToolbar={this.renderToolbar}>
                {
                    accordions.map((accordion, index)=> {
                        if (accordion.fields) {
                            return <List dataSource={accordion.fields} renderRow={this.renderField}
                                         renderHeader={() => <ListHeader>{accordion.title}</ListHeader>}
                                         key={`list-${index}`}/>
                        }
                    })
                }
            </Page>
        );
    }
}

export default SingleIncidentContainer = createContainer((props)=> {
    const {_id} = props;

    const singleIncidentHandle = Meteor.subscribe("SingleIncident", _id);
    const ready = singleIncidentHandle.ready();
    const incident = Incidents.findOne(_id);

    return {
        singleIncidentHandle,
        ready,
        incident
    }
}, SingleIncident);
