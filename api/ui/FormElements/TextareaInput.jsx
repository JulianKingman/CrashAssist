import React from 'react';
import {FieldType} from 'simple-react-form';
import TextInput from './TextInput.jsx';
import {Meteor} from 'meteor/meteor';

if(Meteor.isClient){
    require('./TextareaInput.scss');
}

// textarea
export default class TextareaInput extends TextInput {
    constructor(props) {
        super(props);
        // this.type = 'textarea';
    }

    render() {
        return (
            <textarea className="TextareaInput" name={this.props.fieldName} id="" cols="30" rows={this.props.rows || "5"} onChange={this.onChange.bind(this)}
                      ref="textarea" value={this.state.value || ''}>
            </textarea>
        )
    }
}