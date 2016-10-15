import React, {Component} from 'react';
import {FieldType} from 'simple-react-form';
import TextInput from './TextInput.jsx';
import {Meteor} from 'meteor/meteor';
// import ReactDOM from 'react-dom';
// import onsen from 'onsenui';
if (Meteor.isClient) {
    require('./PhotoInput.scss');
    Ons = require('react-onsenui');
}


export default class PhotoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogShown: false
        };
    }


    getPicture = (source)=> {
        console.log('getting image');
        let publicId = '/crashedcar.jpg';
        if (Meteor.isCordova) {
            let actionSheetOptions = {
                androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // material
                title: 'Upload an Image',
                subtitle: 'Where would you like to upload from?', // supported on iOS only
                buttonLabels: ['Take a Picture', 'Choose from Library'],
                addCancelButtonWithLabel: 'Cancel',
                androidEnableCancelButton: true,
                winphoneEnableCancelButton: true,
                destructiveButtonLast: true // you can choose where the destructive button is shown
            };
            window.plugins.actionsheet.show(actionSheetOptions, (index)=> {
                // console.log(index);
                let pictureSource = index===1? 1: 0;
                navigator.camera.getPicture((res)=> {
                    console.log(res);
                    this.setState({dialogShown: false});
                    // Meteor.call('uploadFile', res);
                    publicId = res;
                    Cloudinary.upload(publicId, {}, function (err, res) {
                        console.log(err, res);
                    });
                    let value = (this.props.value || []);
                    // this.setState({value: publicId});
                    // this.addPhoto();
                    value.push(publicId);
                    this.props.onChange(value);
                }, (err)=> {
                    console.log(err);
                }, {
                    sourceType: pictureSource
                });
            });
        }
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
        if (!this.props.value) return;
        return (this.props.value).map((publicId, index) => {
            return (
                <div className="photo" key={index}>
                    {/*todo: change the url to include publicId, but not just be publicId*/}
                    <div className="image" style={{backgroundImage: `url('${publicId}')`}} onClick={()=> {
                        this.enlargeImage()
                    }}></div>
                    <a className="delete-photo" onClick={()=> {
                        this.removePhoto(index)
                    }}><Ons.Icon icon="md-minus"/></a>
                </div>
            )
        });
    };

    hideDialog = ()=> {
        this.setState({dialogShown: false});
    };

    render() {
        return (
            <div className="photo-input">
                <Ons.Dialog
                    isOpen={this.state.dialogShown}
                    isCancelable={true}
                    onCancel={this.hideDialog.bind(this)}
                >
                    <div style={{textAlign: 'center', margin: '20px'}}>
                        <p style={{opacity: 0.5}}>
                            Would you like to take a picture, or choose a photo from your
                            library?
                        </p>
                        <p>
                            <Ons.Button onClick={()=> {
                                this.getPicture('CAMERA')
                            }}>Picture</Ons.Button>
                            <Ons.Button onClick={()=> {
                                this.getPicture('PHOTOLIBRARY')
                            }}>Library</Ons.Button>
                            <Ons.Button onClick={this.hideDialog.bind(this)}>Cancel</Ons.Button>
                        </p>
                    </div>
                </Ons.Dialog>
                {/*<p>*/}
                {/*{this.props.label}*/}
                {/*</p>*/}
                <div className="photos">
                    {this.renderPhotos()}
                    <a className="photo-button" onClick={()=> {
                        {/*this.setState({dialogShown: true})*/
                        }
                        this.getPicture();
                    }}><Ons.Icon icon="md-camera"/></a>
                    <div className="spacer"></div>
                </div>
            </div>
        )
    }
}