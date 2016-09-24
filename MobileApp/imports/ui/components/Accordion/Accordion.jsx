import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ListItem, Icon } from 'react-onsenui';

import onsen from 'onsenui';

import './Accordion.scss';

export default class Accordion extends Component {

    handleClick = () => {
        let height = this.expander.style.height;

        if(height === "0px"){
            this.expander.style.height = this.clientHeight+'px';
            this.chevron.style.transform = "rotate(90deg)";
        }else{
            this.expander.style.height = "0";
            this.chevron.style.transform = "";
        }
    }

    expanderRef = (ref) => {
        if(ref){
            this.expander = ref;
            window.requestAnimationFrame(()=>{

                this.clientHeight = this.expander.clientHeight;

                this.expander.style.height="0";
            });
        }
    }

    chevronRef = (ref) => {
        this.chevron = ReactDOM.findDOMNode(ref);
    }

    render() {
        let { platform } = onsen;
        let className = ["ons-icon", "chevron"];

        if(!platform.isAndroid()){
            className.push("ion-chevron-right", "ons-icon--ion");
        }else{
            className.push("zmdi-chevron-right", "zmdi");
        }
        return (
            <div className="accordion">
                <div className="title list__item" onClick={this.handleClick}>
                    <div className="left list__item__left">
                        <div ref={this.chevronRef} className={className.join(" ")} style={{fontSize:"14px"}}></div>
                    </div>
                    <div className="center list__item__center">
                        {this.props.title}
                    </div>
                </div>

                <div className="expander" ref={this.expanderRef}>
                    <div className="list__item">
                        <div className="center list__item__center">{this.props.text}</div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
