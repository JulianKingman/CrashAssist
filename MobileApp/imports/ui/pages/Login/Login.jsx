import React, { Component } from 'react';
import { Page, Button, Toolbar } from 'react-onsenui';
import { Form, Field } from 'simple-react-form';
import TextInput  from '../../FormElements/TelInput.jsx';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Landing from '../Landing/Landing.jsx';

import './Login.scss';

let loginSchema = new SimpleSchema({
    email:{
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail",
        srf: {type: TextInput, fieldType:"email"}
    },
    password:{
        type: String,
        min: 6,
        label: "Password",
        srf: {type: TextInput, fieldType:"password"}
    }
});

let navigator;
let isLogin;
let setState;

export default class Login extends Component {
    constructor(props){
        super(props);
        navigator = props.appContext.navigator;
        isLogin = props.isLogin;
        setState = this.setState.bind(this);
        this.state = {};
    }

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className="center">{this.props.isLogin? "Account Login": "Save Account"}</div>
            </Toolbar>
        );
    }

    handleSubmit = () => {
        this.setState({});
        this.refs.form.submit();
    };

    onSubmit(formData) {
        const { email, password } = formData;

        setState({});

        if(isLogin){
            Meteor.logout(()=>{
                Meteor.loginWithPassword(email, password, (error)=>{
                    if(!error){
                        if(Meteor.isCordova){
                            Meteor.call("CheckDuplicateAccountByDevice", device.uuid)
                        }
                        navigator.replacePage({component:Landing, props:{key:"landing"}})
                    }else{
                        setState({loginError:error.reason});
                    }
                });
            });
        }else{
            Meteor.call("setEmailAddress", email, (error)=>{
                if(!error){
                    Accounts.changePassword(Meteor.user().username, password, (error)=>{
                        if(!error){
                            navigator.popPage();
                        }else{
                            setState({loginError:error.reason});
                        }
                    });
                }else{
                    setState({loginError:error.reason});
                }
            });

        }
    }

    render() {
        return (
            <Page id="login-page"
                renderToolbar={this.renderToolbar}>
                <div id="login-form">
                    <div>
                        <Form
                            schema={loginSchema}
                            type="function"
                            ref='form'
                            validate={true}
                            onSubmit={this.onSubmit} />
                        <p>{this.state.loginError}</p>
                    </div>
                    <Button modifier="large" onClick={this.handleSubmit}>{this.props.isLogin? "Login": "Save"}</Button>
                </div>
            </Page>
        );
    }
}