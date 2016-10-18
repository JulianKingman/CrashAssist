import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Cloudinary} from 'meteor/lepozepo:cloudinary'
// import ReactDOM from 'react-dom';
// import onsen from 'onsenui';
const packageOpts = require('/package.json');
let minusIcon, cameraIcon;
Meteor.isClient ? require('./PhotoInput.scss') : '';
// class Modal extends Component {
// }
if (packageOpts.name === "CrashAssistApp") {
    Ons = Meteor.isClient ? require('react-onsenui') : '';
    minusIcon = "icon ons-icon zmdi zmdi-minus";
    cameraIcon = "icon ons-icon zmdi zmdi-camera";
    // Modal.render = ()=> {
    //     return (
    //         <Ons.Modal isOpen={this.props.openState}>
    //             {this.props.children}
    //         </Ons.Modal>
    //     )
    // }
} else if (packageOpts.name === "CrashAssistServer") {
    Rb = Meteor.isClient ? require('react-bootstrap') : '';
    minusIcon = "icon glyphicon glyphicon-minus";
    cameraIcon = "icon glyphicon glyphicon-camera";
    // Modal.render = ()=> {
    //     return (
    //         <Rb.Modal showModal={this.props.openState} onHide={this.close}>
    //             {this.props.children}
    //         </Rb.Modal>
    //     )
    // }
}


export default class PhotoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogShown: false,
            enlargeImageModal: false,
            activeImageId: ''
        };
    }

    componentDidMount() {
        // console.log(packageOpts.name);
    }

    getPicture = (source)=> {
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
                source = index === 1 ? 1 : 0;
                console.log(source);
                navigator.camera.getPicture((res)=> {
                    window.resolveLocalFileSystemURL(res,
                        (FileEntry) => {
                            FileEntry.file((file)=> {
                                const context = this;
                                Cloudinary.upload(file, {
                                    eager: [
                                        {width: 55, height: 55, crop: "fill"}
                                    ]
                                }, function (err, res) {
                                    let value = (context.props.value || []);
                                    console.log(`got fileid with vale ${value}`);
                                    value.push(res.public_id);
                                    context.props.onChange(value);
                                });
                            }, (err) => {
                                console.log("error getting file", err);
                            });
                        },
                        (err)=> {
                            console.log("error resolving url", err);
                        }
                    );
                }, (err)=> {
                    console.log(err);
                }, {
                    sourceType: source
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

    enlargeImage = (publicId)=> {
        console.log(`enlarging image ${publicId}`);
        this.setState({enlargeImageModal: true, activeImageId: publicId});
    };

    renderImage = ()=> {
        let image = Cloudinary._helpers.url(this.state.activeImageId || '', {
            hash: {}
        });
        return (
            <img src={image}/>
        )
    };

    renderPhotos = ()=> {
        if (!this.props.value) return;
        return (this.props.value).map((publicId, index) => {
            let bgImage = Cloudinary._helpers.url(publicId, {
                hash: {
                    width: 55, height: 55, crop: 'fill'
                }
            });
            return (
                <div className="photo" key={index}>
                    {/*todo: change the url to include publicId, but not just be publicId*/}
                    <div
                        className="image"
                        style={{backgroundImage: `url('${bgImage}')`}}
                        onClick={()=> {
                            this.enlargeImage(publicId)
                        }}
                    >
                    </div>
                    <a className="delete-photo" onClick={()=> {
                        this.removePhoto(index)
                    }}>
                        {/*<Ons.Icon icon="md-minus"/></a>*/}
                        <i className={minusIcon}></i>
                    </a>
                </div>
            )
        });
    };

    hideDialog = ()=> {
        // this.setState({dialogShown: false});
    };

    render() {
        return (
            <div className="photo-input">
                <div className="photos">
                    {this.renderPhotos()}
                    <a className="photo-button" onClick={()=> {
                        {/*this.setState({dialogShown: true})*/
                        }
                        this.getPicture();
                    }}>
                        {/*<Ons.Icon icon="md-camera"/>*/}
                        <i className={cameraIcon}></i>
                    </a>
                    <div className="spacer"></div>
                </div>
                {/*<Modal openState={this.state.enlargeImageModal}>*/}
                    {/*{this.renderImage()}*/}
                {/*</Modal>*/}
            </div>
        )
    }
}

// <Ons.Dialog
//     isOpen={this.state.dialogShown}
//     isCancelable={true}
//     onCancel={this.hideDialog.bind(this)}
// >
//     <div style={{textAlign: 'center', margin: '20px'}}>
//         <p style={{opacity: 0.5}}>
//             Would you like to take a picture, or choose a photo from your
//             library?
//         </p>
//         <p>
//             <Ons.Button onClick={()=> {
//                 this.getPicture('CAMERA')
//             }}>Picture</Ons.Button>
//             <Ons.Button onClick={()=> {
//                 this.getPicture('PHOTOLIBRARY')
//             }}>Library</Ons.Button>
//             <Ons.Button onClick={this.hideDialog.bind(this)}>Cancel</Ons.Button>
//         </p>
//     </div>
// </Ons.Dialog>
// <p>
// {this.props.label}
// </p>