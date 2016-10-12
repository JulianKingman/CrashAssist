import React, {Component} from 'react';
import {FieldType} from 'simple-react-form';
import TextInput from './TextInput.jsx';
// import ReactDOM from 'react-dom';
// import onsen from 'onsenui';
if (Meteor.isClient) {
    import './PhotoInput.scss';
    Ons = require('react-onsenui');
}


export default class PhotoInput extends FieldType {
    // constructor(props) {
    //     super(props)
    //     this.state = {}
    // }

    getPicture = ()=>{
        if(Meteor.isCordova){
            Camera.getPicture((res)=>{
                console.log(res);
            })
        }
    }

    render() {
        return (
            <div>
                <p>
                    {this.props.label}
                </p>
                <a className="photo-input" onClick={this.getPicture()}>
                    <Ons.Icon icon="md-camera"/>
                </a>
                <img src={this.props.value}/>
                <TextInput
                    value={this.props.value}
                    hintText='Image Url'
                    onChange={(event) => this.props.onChange(event.target.value)}/>
                <p>
                    {this.props.errorMessage}
                </p>
            </div>
        )
    }
}