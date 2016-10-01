import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// import {ListItem, Icon} from 'react-onsenui';

import onsen from 'onsenui';

import './Accordion.scss';

import Accordion from '/imports/ui/components/Accordion/Accordion.jsx';

export default class Accordions extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     activeAccordion: props.defaultAccordion
        // }
    }

    openAccordion = (index) => {
        // this.setState({activeAccordion: index});
        let accordion = this.refs[`accordion-${index}`];
        let expander = accordion.refs.expander;
        // $(expander).css({"height": "auto"});
        // let normalHeight = expander.clientHeight;
        // $(expander).css({"height": 0});
        // console.log(expander, normalHeight);
        $(".accordion .expander").height(0).addClass("closed");
        $(expander).removeClass("closed").animate({"height": $(expander).get(0).scrollHeight}, 200, function () {
                //todo: tweak this later to make sure everything scrolls right
                let accordionDom =  ReactDOM.findDOMNode(accordion);
                $(".page__content").animate({scrollTop: $(accordionDom).position().top}, 200);
            }
        );
    }

    componentDidMount() {
        this.openAccordion(0);
    }

    componentDidUpdate(oldProps) {
        if(oldProps.data._id !== this.props.data._id){
            this.openAccordion(0);
        }
    }

    render() {
        return (
            <div className="accordions" id={`accordions-${this.props.data._id}`}>
                {
                    this.props.data.accordions.map((accordion, index)=> {
                        let key = `${this.props.data._id}-${index}`;
                        let hasFields = accordion.fields ? accordion.fields.length : false;
                        {/*console.log(this.state.activeAccordion, index, this.state.activeAccordion*1 === index*1);*/
                        }
                        {/*let isOpen = this.state.activeAccordion*1 === index*1;*/
                        }
                        return (
                            <Accordion key={key} title={accordion.title} index={index} ref={`accordion-${index}`}
                                       openAccordion={this.openAccordion}>
                                {accordion.text}
                                {
                                    hasFields
                                        ? <form><input /></form>
                                        : ""
                                }
                            </Accordion>
                        )
                    })
                }
            </div>
        )
    }
}
