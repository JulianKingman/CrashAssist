import React, {Component} from 'react';
import {Form, Field} from 'simple-react-form';
import { Incidents } from '/imports/api/collections/Incidents.js';
import {Button} from 'react-onsenui';

export default class IncidentUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Form
                    collection={Incidents}
                    type='update'
                    ref='form'
                    doc={this.props.doc}
                    onSuccess={(docId) => FlowRouter.go('posts.update', {postId: docId})}>
                    {
                        this.props.fields.map((field, index)=> {
                            return <Field fieldName={field.name} key={index}/>
                        })
                    }
                </Form>
                <Button modifier="outline large" label='Save' onTouchTap={() => this.refs.form.submit()}/>
            </div>
        )
    }
}