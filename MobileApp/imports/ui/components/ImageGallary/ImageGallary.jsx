import React, {Component} from 'react';
import {Modal, Icon, Carousel, CarouselItem} from 'react-onsenui';

import './ImageGallary.scss';

export default class ImageGallary extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: props.index || 0
        }
    }

    handleChange = (event) => {
        this.setState({index: event.activeIndex});
    }

    setIndex = (index) => {
        this.setState({index})
    }
    
    render(){
        return (
            <Modal isOpen={this.props.show} images={this.props.images}>
                <Icon
                    icon={{default:"ion-ios-close-empty", material:"md-close"}}
                    size={30}
                    style={{position:"absolute", right:"10px", top:"10px", zIndex:"100", padding:"20px"}}
                    onClick={this.props.close}/>
                <Carousel onPostChange={this.handleChange} index={this.state.index}  swipeable autoScroll overscrollable>
                    {this.props.images && this.props.images.map((publicId, index) => (
                        <CarouselItem key={index}>
                            <div className="photo">
                                <img src={Cloudinary._helpers.url(publicId, {hash: {
                                    width: 600, height: 600, crop: 'fit'
                                }})} />
                            </div>
                        </CarouselItem>
                    ))}
                    <span></span>
                </Carousel>
                <div style={{
                        textAlign: 'center',
                        fontSize: '20px',
                        position: 'absolute',
                        bottom: '36px',
                        left: '0px',
                        right: '0px'
                    }}>
                    {this.props.images && this.props.images.map((item, index) => (
                        <span key={index} style={{cursor: 'pointer'}} onClick={()=>this.setIndex(index)}>
                                {this.state.index === index ? '\u25CF' : '\u25CB'}
                        </span>
                    ))}
                </div>
            </Modal>
        )
    }
}