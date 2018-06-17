import React, {Component} from 'react';
import {Navbar, Nav, NavItem, Row, Col, FormGroup, FormControl, Button} from 'react-bootstrap';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: Meteor.userId()
        }
    }

    loginHandler(e) {
        e.preventDefault();
        console.log(`logging in with email ${this.state.email}`);
        Meteor.loginWithPassword(this.state.email, this.state.password, (err, res) => {
                // let errors = this.state.errors;
                // this.setState({loading: false});
                if (err && err.error === 400) {
                    throw 'invalid_usename_or_password';
                } else if (err) {
                    throw 'unknown_error';
                } else {
                    // clearErrors();
                    console.log(`should be logged in ${res}`);
                    this.setState({loggedIn: true});
                }
            }
        );
    };

    logoutHandler = ()=> {Ï
        Meteor.logout();
        this.setState({loggedIn: false});
    }

    handlePassword = (e)=> {
        this.setState({password: e.target.value});
    };

    handleEmail = (e)=> {
        this.setState({email: e.target.value});
    };

    render() {
        return (
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
                            {
                                this.state.loggedIn
                                    ?
                                    <Nav pullRight>
                                        <NavItem href="Incidents">
                                            Review Incidents
                                        </NavItem>
                                        <Button onClick={this.logoutHandler}>
                                            Log Out
                                        </Button>
                                    </Nav>
                                    :
                                    <Navbar.Form pullRight>
                                        <form onSubmit={(e) => {
                                          console.log('submitted', e);
                                          this.loginHandler(e);
                                        }}>
                                            <FormGroup>
                                                <FormControl
                                                    type="email"
                                                    placeholder="Email"
                                                    value={this.state.email}
                                                    onChange={this.handleEmail}/>
                                                <FormControl
                                                    type="password"
                                                    placeholder="Password"
                                                    value={this.state.password}
                                                    onChange={this.handlePassword}/>
                                            </FormGroup>
                                            <Button type="submit">
                                                Log In
                                            </Button>
                                        </form>
                                    </Navbar.Form>
                            }
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
        );
    }
}