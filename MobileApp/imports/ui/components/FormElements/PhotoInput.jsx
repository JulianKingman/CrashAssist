import React, {Component} from 'react';
import {FieldType} from 'simple-react-form';
import TextInput from './TextInput.jsx';
// import ReactDOM from 'react-dom';
// import onsen from 'onsenui';
if (Meteor.isClient) {
import
    './PhotoInput.scss';
    Ons = require('react-onsenui');
}


export default class PhotoInput extends FieldType {
    constructor(props) {
        super(props)
        this.state = {}
    }

    addPhoto = (publicId)=> {
        if (!this.state.value) return;
        var value = (this.props.value || []);
        value.push(this.state.value);
        this.props.onChange(value);
        this.setState({value: ''});
    };

    getPicture = ()=> {
        console.log('getting image');
        if (Meteor.isCordova) {
            Camera.getPicture((res)=> {
                console.log(res);
                let publicId = res;
            });
        }
        let publicId = '/crashedcar.jpg';
        this.setState({value: publicId});
        this.addPhoto(publicId);
    };

    removePhoto = (publicId)=> {
        let doDelete = confirm("Are you sure you want to delete this photo?");
        if (doDelete) {
            //delete picture
            console.log('picture deleted');
            const newValue = _.without(this.props.value, publicId);
            this.props.onChange(newValue);
        }
        return false;
    };

    enlargeImage = (index)=> {
        console.log('enlarging image');
    };

    renderPhoto = ()=> {
        return (this.props.value || []).map((publicId, index) => {
            return (
                <div className="photo" key={index}>
                    {/*todo: change the url to include publicId, but not just be publicId*/}
                    <div className="image" style={{backgroundImage: `url('${publicId}')`}} onClick={()=> {this.enlargeImage()}}></div>
                    <a className="delete-photo" onClick={()=> {this.removePhoto(publicId)}}><Ons.Icon icon="md-minus"/></a>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="photo-input">
                <p>
                    {this.props.label}
                </p>
                <div className="photos">
                    {this.renderPhoto()}
                    <a className="photo-button" onClick={()=> {
                        this.getPicture()
                    }}>
                        <Ons.Icon icon="md-camera"/>
                    </a>
                </div>
                <Ons.Input
                    value={this.state.value}
                    hintText='Image Url'
                    onChange={(event) => this.props.onChange(event.target.value)}
                    type="hidden"
                />
            </div>
        )
    }
}