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
        if (Meteor.isCordova) {
            navigator.camera.getPicture((res)=> {
                window.resolveLocalFileSystemURL(res,
                    (FileEntry) => {
                        FileEntry.file((file)=>{
                            const context = this;
                            this.setState({dialogShown: false});

                            Cloudinary.upload(file, {
                                eager: [
                                    {width:55, height:55, crop:"fill"}
                                ]
                            }, function(err, res){
                                let value = (context.props.value || []);
                                value.push(res.public_id);
                                context.props.onChange(value);
                            });
                        }, (err) => {
                            console.log("error getting file", err);
                        });
                    },
                    function(err){
                        console.log("error resolving url", err);
                    }
                );
            }, (err)=>{
                console.log(err);
            },{
                sourceType: Camera.PictureSourceType[source]
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
            let bgImage = Cloudinary._helpers.url(publicId, {hash:{
                width: 55, height: 55, crop: 'fill'
            }});
            return (
                <div className="photo" key={index}>
                    {/*todo: change the url to include publicId, but not just be publicId*/}
                    <div className="image" style={{backgroundImage: `url('${bgImage}')`}} onClick={()=> {
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