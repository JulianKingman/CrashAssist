import React from 'react';
import {FieldType} from 'simple-react-form';
import {TextInput} from './TextInput.jsx';

// textarea
// email
class EmailInput extends TextFieldComponent {
    constructor(props) {
        super(props);
        this.type = 'email';
    }
}

export EmailInput;