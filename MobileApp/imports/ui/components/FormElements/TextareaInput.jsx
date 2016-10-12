import React from 'react';
import {FieldType} from 'simple-react-form';
import TextInput from './TextInput.jsx';

// textarea
export default class TextareaInput extends TextInput {
    constructor(props) {
        super(props);
        // this.type = 'textarea';
    }

    render() {
        return (
            <textarea name={this.props.fieldName} id="" cols="30" rows="10" onChange={this.onChange.bind(this)} ref="textarea" value={this.state.value || ''}></textarea>
        )
    }
}