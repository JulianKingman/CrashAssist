import React, {Component} from 'react';
import {FieldType} from 'simple-react-form';
import TextInput from './TextInput.jsx';
// import ReactDOM from 'react-dom';
// import onsen from 'onsenui';
if (Meteor.isClient) {
    require('./PhotoInput.scss');
    Ons = require('react-onsenui');
}


export default class PhotoInput extends FieldType {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getPicture = ()=> {
        console.log('getting image');
        if (Meteor.isCordova) {
            Camera.getPicture((res)=> {
                console.log(res);
                let publicId = res;
            });
        }
        let value = (this.props.value || []);
        let publicId = '/crashedcar.jpg';
        // this.setState({value: publicId});
        // this.addPhoto();
        value.push(publicId);
        this.props.onChange(value);
    };

    removePhoto = (index)=> {
        let doDelete = confirm("Are you sure you want to delete this photo?");
        if (doDelete) {
            //delete picture
            console.log(`picture ${index} deleted`);
            // const newValue = _.without(this.props.value, publicId);
            this.props.value.splice(index, 1);
            this.props.onChange(this.props.value);
        }
        return false;
    };

    enlargeImage = (index)=> {
        console.log('enlarging image');
    };

    renderPhotos = ()=> {
        if(!this.props.value) return;
        return (this.props.value).map((publicId, index) => {
            return (
                <div className="photo" key={index}>
                    {/*todo: change the url to include publicId, but not just be publicId*/}
                    <div className="image" style={{backgroundImage: `url('${publicId}')`}} onClick={()=> {this.enlargeImage()}}></div>
                    <a className="delete-photo" onClick={()=> {this.removePhoto(index)}}><Ons.Icon icon="md-minus"/></a>
                </div>
            )
        });
    };

    render() {
        return (
            <div className="photo-input">
                {/*<p>*/}
                    {/*{this.props.label}*/}
                {/*</p>*/}
                <div className="photos">
                    {this.renderPhotos()}
                    <a className="photo-button" onClick={()=> {this.getPicture()}}><Ons.Icon icon="md-camera"/></a>
                    <div className="spacer"></div>
                </div>
            </div>
        )
    }
}