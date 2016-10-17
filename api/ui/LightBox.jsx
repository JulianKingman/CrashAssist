import React, {Component} from 'react';
import './LightBox.scss'
export default class LightBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    openHandler = ()=>{
        this.setState({open: true});
    };

    closeHandler = ()=>{
        this.setState({open: false});
    }

    render() {
        let openClass = this.state.open? 'open': '';
        return (
            <div className={`super-simple-lightbox ${openClass}`}>
                <div className="content">
                    {this.props.children}
                </div>
                <div className="overlay" onClick={()=>this.closeHandler()}></div>
            </div>
        );
    }
}