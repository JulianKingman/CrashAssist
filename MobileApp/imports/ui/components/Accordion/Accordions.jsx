import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Col, Row} from 'react-onsenui';
// import onsen from 'onsenui';
import './Accordions.scss';
import Accordion from '/imports/ui/components/Accordion/Accordion.jsx';
import IncidentUpdateForm from '/imports/api/ui/FormElements/IncidentUpdateForm.jsx';

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
        let accordionDom = ReactDOM.findDOMNode(accordion);
        // $(expander).css({"height": "auto"});
        // let normalHeight = expander.clientHeight;
        // $(expander).css({"height": 0});
        // console.log(expander, normalHeight);
        $(".accordion .expander").height(0);
        console.log($(accordion));
        $(".accordion").removeClass("open").addClass("closed");
        $(accordionDom).removeClass("closed").addClass("open");
        //timeout is a fix for content that appears after loading
        setTimeout(function () {
            $(expander).animate({"height": $(expander).get(0).scrollHeight}, 200, function () {
                    //todo: tweak this later to make sure everything scrolls right
                    $(".page__content").animate({scrollTop: $(accordionDom).position().top}, 200);
                }
            );
        }, 30);
    }

    saveForm = (doc) => {

    }

    componentDidMount() {
        this.openAccordion(0);
    }

    componentDidUpdate(oldProps) {
        if (oldProps.data._id !== this.props.data._id) {
            this.openAccordion(0);
        }
    }

    renderFields = (accordion)=> {


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
                                <Col>
                                    <Row>{accordion.text}</Row>
                                    {
                                        hasFields ?
                                            <IncidentUpdateForm
                                                doc={this.props.incident}
                                                fields={accordion.fields}
                                            />
                                            : ""
                                    }
                                </Col>
                            </Accordion>
                        )
                    })
                }
            </div>
        )
    }
}
