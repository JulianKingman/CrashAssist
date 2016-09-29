import React from 'react';
import {FieldType} from 'simple-react-form';
import {TextInput} from './TextInput.jsx';

// textarea
class TextareaInput extends TextFieldComponent {
    constructor(props) {
        super(props);
        this.type = 'textarea';
    }
}

export TextareaInput;