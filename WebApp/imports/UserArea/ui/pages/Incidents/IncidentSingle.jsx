import React, {Component} from 'react';
import {Row, Grid, Col, Table, Glyphicon, Button, Panel, Image} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Incidents} from '/imports/shared/collections/Incidents.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import {Cloudinary} from 'meteor/lepozepo:cloudinary';
import Layout from '../../components/Layout.jsx';
import pageSchema from '/imports/shared/page-schema.js';
import _ from 'underscore';
import {pdfMake} from 'pdfmake';
if (Meteor.isClient) {
    require('./IncidentSingle.scss');
}

export default class IncidentSingle extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            subscription: {
                incident: Meteor.subscribe('SingleIncident', this.props.params.incidentId)
            }
        }
    }

    Incident() {
        // console.log(this.props.params.incidentId);
        return Incidents.find({_id: this.props.params.incidentId}).fetch()[0];
    };

    componentWillUnmount() {
        this.state.subscription.incident.stop();
    }

    enlargeImage = (index, images)=> {
        console.log('image should be open now');
        this.setState({openImageModal: true, imageIndex: index, images: images});
    };

    renderRow = ()=> {
        const accordions = _.flatten(_.pluck(pageSchema, 'accordions'), true);
        return accordions.map((accordion, index)=> {
            if (accordion.fields) {
                {
                    return accordion.fields.map((field, index)=> {
                        return (
                            <tr key={`fieldset-${index}`}>
                                <td>{field.label}</td>
                                <td>{this.renderFields(field, index)}</td>
                            </tr>
                        )
                    })
                }
            }
        })
    };

    renderFields = (field, index)=> {
        // console.log(field.name);
        let fieldParts = field.name.split('.');
        // console.log(this.Incident());
        let baseField = this.Incident()[fieldParts[0]];
        // console.log(baseField);
        let value;
        if (fieldParts.length > 1) {
            value = baseField ? baseField[fieldParts[1]] : baseField;
        } else {
            value = baseField;
        }
        index = field.name + index;
        if (field.type === "photo") {
            value = Array.isArray(value) ? value : typeof value === 'undefined' ? [] : [value];
            // console.log(value, value.length);
            if (value.length) {
                return value.map((photoId, index)=> {
                    let pictureOpts = {}; //{hash: {width: 55, height: 55, crop: 'fill'}};
                    let imageUrl = Meteor.isServer ? Cloudinary.utils.url(photoId, pictureOpts) : Cloudinary._helpers.url(photoId, pictureOpts);
                    return <img src={imageUrl} style={{marginRight: 15}}
                                key={`${field.name}-photo-${index}`}
                                onClick={()=> {
                                    this.enlargeImage(index, value)
                                }} className="incident-photo"/>
                })
            }
        } else if (field.type === "array") {
            let arrayField = this.Incident()[field.name];
            if (arrayField && arrayField.length) {
                //getting the array of field value groups, i.e. fieldGroup.$
                return arrayField.map((fieldset, arrayIndex)=> {
                    //getting the fields, e.g. fieldGroup.$.field1, fieldGroup.$.field2
                    return Object.keys(fieldset).map((key, fieldIndex)=> {
                        return (
                            <span key={`item-${index}-${arrayIndex}-${fieldIndex}`} className="witness-row">
                                <strong>{key}: </strong>{fieldset[key]}
                            </span>
                        )
                    })
                });
            }
        } else {
            if (value) {
                return <div>{value}</div>;
            }
        }
    };

    render() {
        return (
            <Layout>
                <Row className="content-wrapper">
                    <Col xs={10} xsOffset={1}>
                        <Table>
                            <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderRow()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Layout>
        )
    }
}