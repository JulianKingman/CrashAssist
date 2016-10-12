import React, {Component} from 'react';
import {FieldType} from 'simple-react-form';
if(Meteor.isClient){
    Ons = require('react-onsenui');
}

const propTypes = {
    changeOnKeyDown: React.PropTypes.bool,
    fieldType: React.PropTypes.string
};

const defaultProps = {
    changeOnKeyDown: true
};

export default class TextInput extends FieldType {

    constructor(props) {
        super(props);
        this.type = props.type || 'text';
        this.state = {value: props.value};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value});
    }

    onKeyDown(event) {
        if (event.keyCode === 13) {
            this.props.onChange(this.state.value);
        }
    }

    onChange(event) {
        this.setState({value: event.target.value});
        if (this.props.changeOnKeyDown) {
            console.log('changed');
            this.props.onChange(event.target.value);
        }
    }

    render() {
        var fieldType = this.props.fieldType || this.type;
        return (
            <Ons.Input
                ref='input'
                value={this.state.value || ''}
                type={fieldType}
                placeholder={this.props.label}
                disabled={this.props.disabled}
                onChange={this.onChange.bind(this)}
                onKeyDown={this.onKeyDown.bind(this)}
                onBlur={() => this.props.onChange(this.state.value)}
                componentClass={fieldType === 'textarea' ? 'textarea' : 'input'}
                modifier='underbar'
                {...this.passProps}
            />
        );
    }
}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;


// password
// class PasswordFieldComponent extends TextFieldComponent {
//     constructor(props) {
//         super(props);
//         this.type = 'password';
//     }
// }

// color
// class ColorFieldComponent extends TextFieldComponent {
//     constructor(props) {
//         super(props);
//         this.type = 'color';
//     }
// }