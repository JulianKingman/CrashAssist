import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-onsenui';
// import onsen from 'onsenui';
import './Accordions.scss';
import Accordion from '/imports/ui/components/Accordion/Accordion.jsx';
import IncidentUpdateForm from '/imports/ui/FormElements/IncidentUpdateForm.jsx';

export default class Accordions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeAccordion: this.props.defaultAccordion,
            currentStep: this.props.currentStep - 1
        }
    }

    openAccordion = (index = this.state.activeAccordion + 1) => {
        this.setState({activeAccordion: index});
        let accordion = this.refs[`accordion-${index}`];
        // console.log(typeof accordion);
        if (typeof accordion === 'undefined') {
            this.props.next();
            return;
        }
        let expander = accordion.refs.expander;
        let accordionDom = ReactDOM.findDOMNode(accordion);
        // $(expander).css({"height": "auto"});
        // let normalHeight = expander.clientHeight;
        // $(expander).css({"height": 0});
        // console.log(expander, normalHeight);
        $(".accordion .expander").height(0);
        // console.log($(accordion));
        $(".accordion").removeClass("open").addClass("closed");
        $(accordionDom).removeClass("closed").addClass("open");
        //timeout is a fix for content that appears after loading
        setTimeout(function () {
            $(expander).animate({"height": $(expander).get(0).scrollHeight}, 200, function () {
                    //todo: tweak this later to make sure everything scrolls right
                    $(expander).css({height: "auto"});
                    $(".page__content").animate({scrollTop: $(accordionDom).position().top}, 200);
                }
            );
        }, 30);
    }

    componentDidMount() {
        this.openAccordion(0);
    }

    render() {
        let currentStepData = this.props.data[this.state.currentStep];
        let key = currentStepData._id;
        return (
            <div className={`accordions ${this.props.className}`} id={`accordions-${currentStepData._id}`} ref="accordions" key={key}>
                {
                    currentStepData.accordions.map((accordion, index)=> {
                        let key = `${currentStepData._id}-${index}`;
                        let hasFields = accordion.fields ? accordion.fields.length : false;
                        {/*console.log(this.state.activeAccordion, index, this.state.activeAccordion*1 === index*1);*/
                        }
                        {/*let isOpen = this.state.activeAccordion*1 === index*1;*/
                        }
                        return (
                            <Accordion key={key} title={accordion.title} index={index} ref={`accordion-${index}`}
                                       openAccordion={this.openAccordion}>
                                {
                                    accordion.text ?
                                        <p>{accordion.text}</p>
                                        : ""
                                }
                                {
                                    hasFields ?
                                        <IncidentUpdateForm
                                            doc={this.props.incident}
                                            fields={accordion.fields}
                                            goNext={this.openAccordion}
                                        />
                                        : <Button modifier="outline large" onClick={()=> {
                                        this.openAccordion(index + 1)
                                    }}>Continue</Button>
                                }
                            </Accordion>
                        )
                    })
                }
            </div>
        )
    }
}
