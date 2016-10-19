import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Meteor} from 'meteor/meteor';
import {Incidents, Incident} from '../../../../shared/collections/Incidents.js';
import Navigation from '/imports/UserArea/ui/components/Navigation.jsx';
import {Row, Grid, Col, Table, Glyphicon, Button} from 'react-bootstrap';
import Footer from '/imports/UserArea/ui/components/Footer.jsx';

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
        return Incidents.find().fetch();
    }

    render() {
        return (
            <Grid fluid={true}>
                <Navigation/>
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
                            <tr>
                                <td>Example Name</td>
                                <td>7/10/86</td>
                                <td><Button href="/incidents/example">View <Glyphicon glyph="menu-right"/></Button></td>
                            </tr>
                            <tr>
                                <td>Example Name</td>
                                <td>7/10/86</td>
                                <td><Button href="/incidents/example">View <Glyphicon glyph="menu-right"/></Button></td>
                            </tr>
                            <tr>
                                <td>Example Name</td>
                                <td>7/10/86</td>
                                <td><Button href="/incidents/example">View <Glyphicon glyph="menu-right"/></Button></td>
                            </tr>
                            <tr>
                                <td>Example Name</td>
                                <td>7/10/86</td>
                                <td><Button href="/incidents/example">View <Glyphicon glyph="menu-right"/></Button></td>
                            </tr>
                            {
                                this.incidents().map((incident, index)=> {
                                    return (
                                        <tr>
                                            <td>{incident.name}</td>
                                            <td>{incident.date}</td>
                                            <td><Button href={`/incidents/${incident._id}`}>View <Glyphicon glyph="menu-right"/></Button></td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Footer/>
            </Grid>
        )
    }
}