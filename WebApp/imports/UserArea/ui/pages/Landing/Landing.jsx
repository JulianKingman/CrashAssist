import React, {Component} from 'react';
import PhotoInput from '/imports/shared/ui/FormElements/PhotoInput.jsx';
import TextInput from '/imports/shared/ui/FormElements/TextInput.jsx';
import TextareaInput from '/imports/shared/ui/FormElements/TextareaInput.jsx';

export default class Landing extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to Crash Assist!</h1>
                <TextInput />
                <PhotoInput/>
                <TextareaInput></TextareaInput>
            </div>
        );
    }
}
