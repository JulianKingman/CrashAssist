import React, {Component} from 'react';
import {FieldType} from 'simple-react-form'
// import ReactDOM from 'react-dom';
import {Icon} from 'react-onsenui';
// import onsen from 'onsenui';

export default class PhotoInput extends FieldType {
    // constructor(props) {
    //     super(props)
    //     this.state = {}
    // }

    render() {
        return (
            <div>
                <p>
                    {this.props.label}
                </p>
                <img src={this.props.value} />
                <TextField
                    value={this.props.value}
                    hintText='Image Url'
                    onChange={(event) => this.props.onChange(event.target.value)} />
                <p>
                    {this.props.errorMessage}
                </p>
            </div>
        )
    }
}