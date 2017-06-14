import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Meteor} from 'meteor/meteor';
import {Incidents, Incident} from '/imports/collections/Incidents.js';
import {Row, Grid, Col, Table, Glyphicon, Button} from 'react-bootstrap';
import Layout from '../../components/Layout.jsx';
import moment from 'moment';

export default class IncidentList extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            subscription: {
                incidents: Meteor.subscribe('PastIncidents')
            }
        }
    }

    componentWillUnmount() {
        this.state.subscription.incidents.stop();
    }

    incidents() {
        // if (this.state.subscription.incidents.ready()) {
        // console.log(Incidents);
            return Incidents.find({}).fetch();
        // }
    }

    render() {
        return (
            <Layout>
                <Row className="incidents-section content-wrapper">
                    <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={3}>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>Incident Name</th>
                                <th>Incident Date</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.incidents().map((incident, i)=> {
                                    return (
                                        <tr key={`incident-${i}`}>
                                            <td>{incident.title}</td>
                                            <td>{moment(incident.dateCreated).format('DD/MM/YYYY').toString()}</td>
                                            <td><Button href={`/incidents/${incident._id}`}>View <Glyphicon
                                                glyph="menu-right"/></Button></td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Layout>
        )
    }
}