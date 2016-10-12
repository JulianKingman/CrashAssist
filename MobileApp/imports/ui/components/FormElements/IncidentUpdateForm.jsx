import React, {Component} from 'react';
import {Form, Field} from 'simple-react-form';
import {Incidents} from '/imports/api/collections/Incidents.js';
import {Button, List, ListItem, Col, Row} from 'react-onsenui';

export default class IncidentUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderField = (field, index)=> {
        // let value = this.props.doc[field.name] || "";
        // console.log(`value ${value} for ${field.name}`);
        // var nestedFields = field.nestedFields ? field.nestedFields.length : false;
        // console.log(field.nestedFields);
        // if (nestedFields) {
        //     return (
        //         <Field fieldName={field.name} key={index} label={field.label}>
        //             {
        //                 field.nestedFields.map((field, index)=> {
        //                     return <Field fieldName={field.name} key={index} label={field.label}/>
        //                 })
        //             }
        //         </Field>
        //     )
        // } else {
            return (
                <Field fieldName={field.name} key={index} label={field.label}/>
            )
        // }
    };

    submitForm = ()=> {
        console.log(this.props.doc);
        this.refs.form.submit();
    };

    render() {
        let component = this;
        return (
            <div>
                <Form collection={Incidents} type='update' ref='form' doc={this.props.doc} onSuccess={(docId) => {
                    console.log(`succeeded saving ${docId}`)
                }}>
                    {
                        this.props.fields.map(function (field, index) {
                            return component.renderField(field, index)
                        })
                    }
                </Form>
                <Button modifier="outline large" label='Save' onClick={() => this.submitForm()}
                        ripple={true}>Save</Button>
            </div>
        )
    }
}