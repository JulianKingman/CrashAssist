import React, { Component } from 'react';
import { Page, Icon } from 'react-onsenui';

import './NewIncidentSuccess.scss';

export default class NewIncidentSuccess extends Component {
    componentDidMount() {
        setTimeout(()=> this.props.appContext.navigator.popPage(), 2000)
    }

    render() {
        return (
            <Page id="new-incident-success">
                <div id="new-incident-success">
                    <Icon
                        size={{default: 50, material: 40}}
                        icon={{default: 'ion-thumbsup', material: 'md-thumb-up'}}
                    />
                    <h1>All Done!</h1>
                    <p>Good Job, we knew you could do it!</p>
                </div>
            </Page>
        )
    }
}
