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
    // constructor(props) {
    //     super(props)
    //     this.state = {}
    // }

    addPhoto = (publicId)=> {

    };

    getPicture = ()=> {
        console.log('getting image');
        if (Meteor.isCordova) {
            Camera.getPicture((res)=> {
                console.log(res);
                let publicId = res;
                this.addPhoto(publicId);
            })
        }
    };

    removePhoto = (index)=> {
        let doDelete = confirm("Are you sure you want to delete this photo?");
        if (doDelete) {
            //delete picture
            console.log('picture deleted');
        }
        return false;
    };

    enlargeImage = (index)=> {
        console.log('enlarging image');
    };

    renderPhoto = ()=> {
        return (
            <div className="photo">
                <div className="image" style={{backgroundImage: "url('/crashedcar.jpg')"}} onClick={()=> {
                    this.enlargeImage()
                }}></div>
                <a className="delete-photo" onClick={()=> {
                    this.removePhoto()
                }}>
                    <Ons.Icon icon="md-minus"/>
                </a>
                <Ons.Input
                    value={this.props.value}
                    hintText='Image Url'
                    onChange={(event) => this.props.onChange(event.target.value)}
                    type="hidden"
                />
            </div>
        )
    }

    render() {
        return (
            <div className="photo-input">
                <p>
                    {this.props.label}
                </p>
                <div className="photos">
                    {this.renderPhoto()}
                    <a className="photo-button" onClick={()=> {this.getPicture()}}>
                        <Ons.Icon icon="md-camera"/>
                    </a>
                </div>
            </div>
        )
    }
}