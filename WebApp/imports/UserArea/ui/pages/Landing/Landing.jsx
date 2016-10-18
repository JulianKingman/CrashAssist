import React, {Component} from 'react';
import {
    Navbar,
    Nav,
    NavItem,
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
if (Meteor.isClient) {
    require('./Landing.scss');
}

export default class Landing extends Component {
    render() {
        return (
            <Grid fluid={true}>
                <Row componentClass="header">
                    <Col xs={12}>
                        <Navbar fixedTop>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="/">
                                        <img src="/images/CrashAssistLogoH.png" alt="Crash Assist Logo"/>
                                    </a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                {/*<Nav pullRight>*/}
                                <Navbar.Form pullRight>
                                    <Button>
                                        Log In
                                    </Button>
                                </Navbar.Form>
                                {/*</Nav>*/}
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
                <Row componentClass="section" className="header-section">
                    <Col xs={12}>
                        <Grid className="hero">
                            <img src="/images/AccidentBlurry.jpg" alt="" className="img-bg"/>
                            <img src="/images/Android CrashAssist.png" alt="Android CrashAssist App Screenshot"
                                 className="android-image"/>
                            <img src="/images/iOS CrashAssist.png" alt="iOS CrashAssist App Screenshot"
                                 className="ios-image"/>
                            <div className="text">
                                <h1>Get the right information <br/>at the right time</h1>
                                <p className="lead">A car accident is a stressful situation, and there are too many
                                    important things to
                                    remember. Let Crash Assist make it easy by giving you a step-by-step guide to follow
                                    at
                                    the scene of the accident. Do the right things, ask the right questions, and follow
                                    the
                                    right steps, and the after-math will be that much easier.</p>
                            </div>
                        </Grid>
                    </Col>
                </Row>
                <Row componentClass="section" className="download-section">
                    <Col xs={12}>
                        <Grid className="">
                            <h1 className="callout">Download Free</h1>
                            <a href="#"><img src="/images/google-play-badge.png"
                                             alt="Download CrashAssist on the Google Play store"
                                             className="google-play"/></a>
                            <a href="#"><img src="/images/Download_on_the_App_Store_Badge_US-UK_135x40.svg"
                                             alt="Download CrashAssist on the App Store" className="app-store"/></a>
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
                            <h2>Contact Us</h2>
                            <form>
                                <FormGroup>
                                    <ControlLabel>Your Email Address:</ControlLabel>
                                    <FormControl type="email" placeholder="Subject"/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Subject:</ControlLabel>
                                    <FormControl type="text" placeholder="Subject"/>
                                </FormGroup>
                                <FormGroup controlId="formControlsTextarea">
                                    <ControlLabel>Content</ControlLabel>
                                    <FormControl componentClass="textarea" placeholder="textarea"/>
                                </FormGroup>
                                <Button type="submit" bsStyle="primary" bsSize="large" pullRight>
                                    <Glyphicon glyph="send"/> Send
                                </Button>
                            </form>
                        </Grid>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
