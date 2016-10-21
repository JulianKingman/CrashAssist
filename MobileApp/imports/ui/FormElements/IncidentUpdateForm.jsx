import React, {Component} from 'react';
import {Form, Field} from 'simple-react-form';
import {Incidents} from '/imports/api/collections/Incidents.js';
import {Button, List, ListItem, Col, Row} from 'react-onsenui';
import {Meteor} from 'meteor/meteor';

if(Meteor.isClient){
    import './IncidentUpdateForm.scss';
}

export default class IncidentUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submitForm = (noNext)=> {
        // console.log(this.props.doc, this.refs.form);
        this.refs.form.submit();
        if(!noNext) this.props.goNext();
    };

    render() {
        return (
            <div className="IncidentUpdateForm">
                <Form
                    collection={Incidents}
                    type='update'
                    ref='form'
                    doc={this.props.doc}
                    onSuccess={(docId) => {console.log(`succeeded saving ${docId}`)}}
                    onSubmit={(docId)=>{console.log(`submitted ${docId}`)}}
                    className="IncidentUpdateForm"
                >
                    {
                        this.props.fields.map((field, index)=> {
                            let arrayText = field.arrayText? field.arrayText: 'Item';
                            return <Field 
                                        fieldName={field.name} 
                                        key={index} 
                                        label={field.label} 
                                        arrayText={arrayText} 
                                        showModal={this.props.showModal}
                                        submitForm={this.submitForm}/>
                        })
                    }
                </Form>
                <Button modifier="outline large" label='Save and Continue' onClick={() => this.submitForm()} ripple={true}>Save and Continue</Button>
            </div>
        )
    }
}