import React, {Component} from 'react';
import {Form, Field} from 'simple-react-form';
import {Incidents} from '/imports/shared/collections/Incidents.js';
import {Button, Icon} from 'react-onsenui';
import {Meteor} from 'meteor/meteor';
import {notify} from 'react-notify-toast';

if (Meteor.isClient) {
    require('./IncidentUpdateForm.scss');
}

export default class IncidentUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSaved: true
        };
    }

    submitForm = ()=> {
        // console.log(this.props.doc, this.refs.form);
        this.refs.form.submit();
        this.setState({isSaved: true});
        notify.show('Progress saved', 'success');
        this.props.goNext();
    };

    modified = ()=> {
        this.setState({isSaved: false});
    }

    render() {
        return (
            <div className="IncidentUpdateForm">
                {
                    !this.state.isSaved ?
                        <div className="warning">
                            <Icon icon="md-alert-triangle"/> Pending changes, click the check to save and continue.
                        </div>
                        : ""
                }
                <Form
                    collection={Incidents}
                    type='update'
                    ref='form'
                    doc={this.props.doc}
                    onChange={this.modified}
                    onSuccess={(docId) => {
                        console.log(`succeeded saving ${docId}`)
                    }}
                    onSubmit={(docId)=> {
                        console.log(`submitted ${docId}`)
                    }}
                    className="IncidentUpdateForm"
                >
                    {
                        this.props.fields.map(function (field, index) {
                            let arrayText = field.arrayText ? field.arrayText : 'Item';
                            return <Field fieldName={field.name} key={index} label={field.label}
                                          placeholder={field.label} arrayText={arrayText}/>
                        })
                    }
                </Form>
                <Button modifier="outline" className="go-next" label='Save and Continue' onClick={() => this.submitForm()}
                        ripple={true}><Icon icon="md-check"/> Save</Button>
            </div>
        )
    }
}