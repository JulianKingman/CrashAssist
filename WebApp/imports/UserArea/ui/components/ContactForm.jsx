import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Alert, FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap';

export default class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            subject: '',
            body: '',
            alert: {
                show: false,
                title: '',
                type: 'success',
                message: ''
            },

        }
    }

    updateEmail = (e)=> {
        this.setState({email: e.target.value});
    };

    updateSubject = (e)=> {
        this.setState({subject: e.target.value});
    };

    updateBody = (e)=> {
        this.setState({body: e.target.value});
    };

    submitContactForm = (e)=> {
        e.preventDefault();
        Meteor.call('sendEmail', 'julian.kingman@gmail.com', this.state.email, `CrashAssist Email - ${this.state.subject}`, this.state.body, (e, r)=> {
            if (r) {
                this.setState({
                    alert: {
                        show: true,
                        type: 'success',
                        title: 'Message Sent!',
                        message: 'You should be hearing back from us shortly'
                    }
                });
            } else {
                this.setState({
                    alert: {
                        show: true,
                        type: 'danger',
                        title: 'Something went wrong...',
                        message: 'Let the tech team know at julian.kingman@gmail.com'
                    }
                });
            }
            setTimeout(()=> {
                this.setState({alert: {show: false}});
            }, 4000);
        });
    };

    render() {
        return (
            <div>
                {
                    this.state.alert.show ?
                        <Alert bsStyle={this.state.alert.type}>
                            <h4>{this.state.alert.title}</h4>
                            <p>{this.state.alert.message}</p>
                        </Alert>
                        :
                        ''
                }
                <h2>Contact Us</h2>
                <form onSubmit={this.submitContactForm}>
                    <FormGroup>
                        <ControlLabel>Your Email Address:</ControlLabel>
                        <FormControl type="email" placeholder="Email" onChange={this.updateEmail}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Subject:</ControlLabel>
                        <FormControl type="text" placeholder="Subject" onChange={this.updateSubject}/>
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Content</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="textarea" onChange={this.updateBody}/>
                    </FormGroup>
                    <Button type="submit" bsStyle="primary" bsSize="large">
                        <Glyphicon glyph="send"/> Send
                    </Button>
                </form>
            </div>
        )
    }
}