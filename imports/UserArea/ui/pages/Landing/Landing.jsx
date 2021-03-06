import React, { Component } from 'react';
import {
    Button,
    Grid,
    Row,
    Col,
    Glyphicon,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock
} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import Layout from '../../components/Layout.jsx';
import ContactForm from '../../components/ContactForm.jsx';

if (Meteor.isClient) {
    require('./Landing.scss');
}
export default class Landing extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Row componentClass="section" className="header-section">
                    <Col xs={12}>
                        <Grid className="hero">
                            <Row>
                                <Col smHidden={true} md={4} className="phone-screenshots">
                                    <img src="/images/iOS CrashAssist.png" alt="iOS CrashAssist App Screenshot"
                                         className="ios-image"/>
                                    <img src="/images/Android CrashAssist.png" alt="Android CrashAssist App Screenshot"
                                         className="android-image"/>
                                </Col>
                                <Col sm={12} md={7} mdOffset={1} className="text">
                                    <h1>Get the right information <br/>at the right time</h1>
                                    <p className="lead">A car accident is a stressful situation, and there are too
                                        many
                                        important things to
                                        remember. Let Crash Assist make it easy by giving you a step-by-step guide
                                        to follow
                                        at
                                        the scene of the accident. Do the right things, ask the right questions, and
                                        follow
                                        the
                                        right steps, and the after-math will be that much easier.</p>
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                </Row>
                <Row componentClass="section" className="download-section">
                    <Col xs={12}>
                        <Grid className="">
                            <h1 className="callout">Download Free</h1>
                            <a href="https://play.google.com/store/apps/details?id=com.crashassist.app" className="google-play"><img src="/images/google-play-badge.png"
                                                                     alt="Download CrashAssist on the Google Play store"/></a>
                            <a href="https://itunes.apple.com/us/app/crash-assist-app/id1167647959?ls=1&mt=8" className="app-store"><img
                                src="/images/Download_on_the_App_Store_Badge_US-UK_135x40.svg"
                                alt="Download CrashAssist on the App Store"/></a>
                        </Grid>
                    </Col>
                </Row>
                <Row componentClass="section" className="features-section">
                    <Col xs={12}>
                        <Grid className="">
                            <Row>
                                <Col xs={12} sm={4}>
                                    <h2 className="big-icon"><Glyphicon glyph="check"/></h2>
                                    <h2>Step-by-Step Process</h2>
                                    <p>Crash Assist guides you through each step of the process of an accident. Crash
                                        Assist guides you through:</p>
                                    <ul>
                                        <li>How to stay safe</li>
                                        <li>What to say and what not to say</li>
                                        <li>What information to collect</li>
                                        <li>What to do after the accident</li>
                                        <li>And more!</li>
                                    </ul>
                                </Col>
                                <Col xs={12} sm={4}>
                                    <h2 className="big-icon"><Glyphicon glyph="edit"/></h2>
                                    <h2>Collect the Right Info</h2>
                                    <p>Crash Assist “asists” you with gathering the right information. Follow through a
                                        simple form to enter important details about the accident, and take pictures
                                        directly from your phone. Afterwards, your information is saved for you to use
                                        later.</p>
                                </Col>
                                <Col xs={12} sm={4}>
                                    <h2 className="big-icon"><Glyphicon glyph="share"/></h2>
                                    <h2>Easily Deliver Your Info</h2>
                                    <p>Create a free account with Crash Assist to view your information online and share
                                        it with relevant people. Email your information to parents, lawyers,
                                        insurance agents, or doctors with the push of a button. Save yourself the hassle
                                        of repeating yourself!</p>
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                </Row>
                <Row componentClass="section" className="contact-section">
                    <Col xs={12}>
                        <Grid className="">
                            <ContactForm />
                        </Grid>
                    </Col>
                </Row>
            </Layout>
        );
    }
}
