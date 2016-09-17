import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ListItem, Icon } from 'react-onsenui';

import './Accordion.scss';

export default class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick() {
        let height = this.expander.style.height;

        if(height === "0px"){
            this.expander.style.height = this.clientHeight+'px';
            this.chevron.style.transform = "rotate(90deg)";
        }else{
            this.expander.style.height = "0";
            this.chevron.style.transform = "";
        }
    }
    expanderRef(ref) {
        this.expander = ref;
        window.requestAnimationFrame(()=>{

            this.clientHeight = this.expander.clientHeight;

            this.expander.style.height="0";
        });
    }
    chevronRef(ref) {
        this.chevron = ReactDOM.findDOMNode(ref);
    }
    render() {
        let className = "accordion";

        if(this.state.open) {
            className += " open";
        }
        return (
            <div className={className}>
                <ListItem
                    className="title"
                    tappable={true}
                    onClick={() => this.handleClick()} >
                    <div className="left">
                        <Icon className="chevron" ref={(ref) => this.chevronRef(ref)} size={{default: 14, material: 14}} icon='ion-chevron-right' />
                    </div>
                    <div className="center">{this.props.title}</div>
                </ListItem>
                <div className="expander" ref={(ref) => this.expanderRef(ref)}>
                    <ListItem>
                        <div className="center">{this.props.text}</div>
                    </ListItem>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
