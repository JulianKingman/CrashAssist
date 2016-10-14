import React, {Component} from 'react';
import {Form, Field} from 'simple-react-form';
import {Incidents} from '/imports/api/collections/Incidents.js';
import {Button, List, ListItem, Col, Row} from 'react-onsenui';

export default class IncidentUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submitForm = ()=> {
        console.log(this.props.doc, this.refs.form);
        this.refs.form.submit();
    };

    render() {
        return (
            <div>
                <Form collection={Incidents} type='update' ref='form' doc={this.props.doc} onSuccess={(docId) => {
                    console.log(`succeeded saving ${docId}`)
                }} onSubmit={(docId)=>{console.log(`submitted ${docId}`)}}>
                    {
                        this.props.fields.map(function (field, index) {
                            return <Field fieldName={field.name} key={index} label={field.label}/>
                        })
                    }
                </Form>
                <Button modifier="outline large" label='Save' onClick={() => this.submitForm()} ripple={true}>Save</Button>
            </div>
        )
    }
}