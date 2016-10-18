import React, {Component} from 'react';
import {Row, Grid, Col, Table, Glyphicon, Button, Panel, Image} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import Incidents from '/imports/shared/collections/Incidents.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Cloudinary} from 'meteor/lepozepo:cloudinary';

export default class IncidentSingle extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            subscription: {
                incident: Meteor.subscribe('SingleIncident', this.props.params.incidentId)
            }
        }
    }

    componentWillUnmount() {
        this.state.subscription.incident.stop();
    }

    incident() {
        return Incidents.findOne().fetch();
    }

    render() {
        return (
            <Grid fluid={true}>
                <Navigation/>
                <Row className="content-wrapper">
                    <Col xs={10} xsOffset={1}>
                        <Table>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td>Title</td>
                                <td>{this.incident().title}</td>
                            </tr>
                            <tr>
                                <td>Date Started</td>
                                <td>{this.incident().dateCreated}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{this.incident().complete ? 'Complete' : 'Incomplete'}</td>
                            </tr>
                            <tr>
                                <td>Driver Information</td>
                                <td>
                                    {this.incident()["driverInfo.name"]}<br/>
                                    {this.incident()["driverInfo.address"]}<br/>
                                    {this.incident()["driverInfo.phone"]}<br/>
                                    {this.incident()["driverInfo.email"]}<br/>
                                    {this.incident()["driverInfo.license"]}
                                </td>
                            </tr>
                            <tr>
                                <td>Driver Statement</td>
                                <td>{this.incident().driverStatement}</td>
                            </tr>
                            <tr>
                                <td>Owner Information</td>
                                <td>
                                    {this.incident()["ownerInfo.name"]}<br/>
                                    {this.incident()["ownerInfo.address"]}<br/>
                                    {this.incident()["ownerInfo.phone"]}<br/>
                                    {this.incident()["ownerInfo.email"]}<br/>
                                    {this.incident()["ownerInfo.license"]}
                                </td>
                            </tr>
                            <tr>
                                <td>Vehicle Information</td>
                                <td>
                                    {this.incident()["vehicleInfo.make"]}<br/>
                                    {this.incident()["vehicleInfo.model"]}<br/>
                                    {this.incident()["vehicleInfo.year"]}<br/>
                                    {this.incident()["vehicleInfo.plate"]}
                                </td>
                            </tr>
                            <tr>
                                <td>Insurance Information</td>
                                <td>
                                    {this.incident()["insuranceInfo.company"]}<br/>
                                    {this.incident()["insuranceInfo.policyNumber"]}<br/>
                                    {this.incident()["insuranceInfo.agent"]}
                                </td>
                            </tr>
                            <tr>
                                <td>Date and Time Information</td>
                                <td>
                                    {this.incident()["timeLocation.date"]}<br/>
                                    {this.incident()["timeLocation.time"]}<br/>
                                    {this.incident()["timeLocation.location"]}
                                </td>
                            </tr>
                            <tr>
                                <td>Traffic Information</td>
                                <td>
                                    {this.incident()["trafficInfo.roadConditions"]}<br/>
                                    {this.incident()["trafficInfo.trafficControls"]}
                                </td>
                            </tr>
                            <tr>
                                <td>Passenger Information</td>
                                <td>
                                    {
                                        this.incident().passengerInfo.map((passenger, index)=> {
                                            return (
                                                <Panel header={`Passenger ${index + 1}`}>
                                                    {this.incident()[`passengerInfo.${index}.name`]}<br/>
                                                    {this.incident()[`passengerInfo.${index}.phone`]}<br/>
                                                    {this.incident()[`passengerInfo.${index}.email`]}
                                                </Panel>
                                            )
                                        })
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Witness Information</td>
                                <td>
                                    {
                                        this.incident().witnessInfo.map((witness, index)=> {
                                            return (
                                                <Panel header={`Witness ${index + 1}`}>
                                                    {this.incident()[`witnessInfo.${index}.name`]}<br/>
                                                    {this.incident()[`witnessInfo.${index}.phone`]}<br/>
                                                    {this.incident()[`witnessInfo.${index}.email`]}<br/>
                                                    {this.incident()[`witnessInfo.${index}.testimony`]}
                                                </Panel>
                                            )
                                        })
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Scene Sketch</td>
                                <td>
                                    {
                                        this.incident().sketch.map((publicId, index)=> {
                                            let image = Cloudinary._helpers.url(publicId, {
                                                hash: {}
                                            });
                                            return (
                                                <Image src={image} alt="" thumbnail/>
                                            )
                                        })
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Scene Photos</td>
                                <td>
                                    {
                                        this.incident().photos.map((publicId, index)=> {
                                            let image = Cloudinary._helpers.url(publicId, {
                                                hash: {}
                                            });
                                            return (
                                                <Image src={image} alt="" thumbnail/>
                                            )
                                        })
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Symptons</td>
                                <td>
                                    <ul>
                                        {
                                            this.incident().symptoms.map((symptom, index)=> {
                                                let image = Cloudinary._helpers.url(publicId, {
                                                    hash: {}
                                                });
                                                return (
                                                    <li>{symptom}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </td>
                            </tr>
                        </Table>
                    </Col>
                </Row>
                <Footer/>
            </Grid>
        )
    }
}