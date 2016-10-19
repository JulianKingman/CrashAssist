import React, { Component } from 'react';
import { Page, Button } from 'react-onsenui';
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
        console.log(props);
        navigator = props.appContext.navigator;
        isLogin = props.isLogin;
        setState = this.setState.bind(this);
        this.state = {};
    }

    handleSubmit = () => {
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
            Meteor.call("setEmailAddress", password, (error)=>{
                if(!error){
                    setState({loginError:error.reason});
                }else{
                    Accounts.changePassword(Meteor.userId(), password, (error)=>{
                        if(!error){
                            navigator.popPage();
                        }else{
                            setState({loginError:error.reason});
                        }
                    });
                }
            });

        }
    }

    render() {
        return (
            <Page>
                <div id="login-page">
                    <Form
                        schema={loginSchema}
                        type="function"
                        ref='form'
                        validate={true}
                        onSubmit={this.onSubmit} />
                    <p>{this.state.loginError}</p>
                    <Button modifier="large" onClick={this.handleSubmit}>{this.props.isLogin? "Login": "Save Account"}</Button>
                </div>
            </Page>
        );
    }
}