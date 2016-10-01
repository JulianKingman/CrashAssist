import {React} from 'react';
import {Form, Field} from 'simple-react-form';
import Incidents from 'imports/api/collections/Incidents.js'

export default class Form extends Component {
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
                    doc={this.props.incident}
                    onSuccess={(docId) => FlowRouter.go('posts.update', {postId: docId})}>
                    {
                        this.props.fields.map((field)=> {
                            return <Field fieldName={field}/>
                        });
                    }
                </Form>
                <RaisedButton primary={true} label='Save' onTouchTap={() => this.refs.form.submit()}/>
            </div>
        )
    }
}