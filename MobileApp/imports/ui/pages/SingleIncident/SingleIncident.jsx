import React, {Component} from 'react';
import {Page, Toolbar, ToolbarButton, BackButton, List, ListItem, ListHeader, Button, Icon} from 'react-onsenui';
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
        // console.log(`field ${field.name} of type ${field.type}`);
        // console.log(`index: ${index}`);
        index = field.name + index;
        if (field.type === "photo") {
            return (
                <ListItem key={`item-${index}`}>Photos go here</ListItem>
            )
        } else if (field.type === "array") {
            // console.log("is an array");
            let arrayField = this.props.incident[field.name];
            if (arrayField && arrayField.length) {
                //getting the array of field value groups, i.e. fieldGroup.$
                return arrayField.map((fieldset, arrayIndex)=> {
                    // console.log(Object.keys(fieldset));
                    //getting the fields, e.g. fieldGroup.$.field1, fieldGroup.$.field2
                    return Object.keys(fieldset).map((key, fieldIndex)=> {
                        // console.log(`Key: ${key}, Value: ${fieldset[key]}, Component Key: ${`item-${index}-${arrayIndex}-${fieldIndex}`}`);
                        return (
                            <ListItem key={`item-${index}-${arrayIndex}-${fieldIndex}`}>
                                <div className="left">{key}</div>
                                <div className="center">{fieldset[key]}</div>
                            </ListItem>
                        )
                    })
                });
            }
        } else {
            let fieldParts = field.name.split('.');
            let baseField = this.props.incident[fieldParts[0]];
            let value;
            if (fieldParts.length > 1) {
                value = baseField ? baseField[fieldParts[1]] : baseField;
            } else {
                value = baseField;
            }
            // console.log(fieldParts, baseField, value);
            if (value) {
                return (
                    <ListItem key={`item-${index}`}>
                        <div className="left">{field.label}</div>
                        <div className="center">{value.toString()}</div>
                    </ListItem>
                );
            }
        }
    };

    deleteIncident = ()=> {
        if (confirm("Are you sure you want to delete this incident?")) {
            Incidents.remove(this.props.incident._id);
            this.props.appContext.navigator.popPage()
        }
    };

    render() {
        const accordions = _.flatten(_.pluck(pageSchema, 'accordions'), true);
        // console.log(accordions);
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
                <Button modifier="large outline" onClick={this.deleteIncident}><Icon icon="md-delete"/> Delete</Button>
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
