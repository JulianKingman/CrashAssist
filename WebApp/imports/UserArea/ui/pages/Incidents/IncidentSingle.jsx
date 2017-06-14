import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {Row, Grid, Col, Table, Glyphicon, Button, Panel, Image} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Incidents} from '/imports/collections/Incidents.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import {Cloudinary} from 'meteor/lepozepo:cloudinary';
import Layout from '../../components/Layout.jsx';
import pageSchema from '/imports/page-schema.js';
import _ from 'lodash';
// const pdfMake = require('pdfmake-node');
import {getBinary, base64Encode} from '/imports/UserArea/lib/encodeImage.js'
if (Meteor.isClient) {
    require('./IncidentSingle.scss');
}

export default class IncidentSingle extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            subscription: {
                incident: Meteor.subscribe('SingleIncident', this.props.params.incidentId)
            }
        }

    }

    Incident() {
        return Incidents.find({_id: this.props.params.incidentId}).fetch()[0];
    };

    componentWillUnmount() {
        this.state.subscription.incident.stop();
    }

    enlargeImage = (index, images)=> {
        console.log('image should be open now');
        this.setState({openImageModal: true, imageIndex: index, images: images});
    };

    renderRow = ()=> {
        const accordions = _.flatten(_.map(pageSchema, 'accordions'), true);
        return accordions.map((accordion, index)=> {
            if (accordion.fields) {
                {
                    return accordion.fields.map((field, index)=> {
                        return (
                            <tr key={`fieldset-${index}`} data-title={accordion.title}>
                                <td>{field.label}</td>
                                <td data-type={field.type}>{this.renderFields(field, index)}</td>
                            </tr>
                        )
                    })
                }
            }
        })
    };

    renderFields = (field, index)=> {
        // console.log(field.name);
        let fieldParts = field.name.split('.');
        // console.log(this.Incident());
        let baseField = this.Incident()[fieldParts[0]];
        // console.log(baseField);
        let value;
        if (fieldParts.length > 1) {
            value = baseField ? baseField[fieldParts[1]] : baseField;
        } else {
            value = baseField;
        }
        index = field.name + index;
        if (field.type === "photo") {
            value = Array.isArray(value) ? value : typeof value === 'undefined' ? [] : [value];
            // console.log(value, value.length);
            if (value.length) {
                return (
                    <Row>
                        {
                            value.map((photoId, index)=> {
                                let pictureOpts = {}; //{hash: {width: 55, height: 55, crop: 'fill'}};
                                let imageUrl = Meteor.isServer ? Cloudinary.utils.url(photoId, pictureOpts) : Cloudinary._helpers.url(photoId, pictureOpts);
                                return (
                                    <Col xs={6} sm={4} md={3}>
                                        <img src={imageUrl} style={{marginRight: 15}}
                                             key={`${field.name}-photo-${index}`}
                                             onClick={()=> {
                                                 this.enlargeImage(index, value)
                                             }} className="incident-photo"/>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                )
            }
        } else if (field.type === "array") {
            let arrayField = this.Incident()[field.name];
            if (arrayField && arrayField.length) {
                //getting the array of field value groups, i.e. fieldGroup.$
                return arrayField.map((fieldset, arrayIndex)=> {
                    //getting the fields, e.g. fieldGroup.$.field1, fieldGroup.$.field2
                    return (
                        <p key={`item-${index}-${arrayIndex}`}>
                            {
                                Object.keys(fieldset).map((key, fieldIndex)=> {
                                    return (
                                        <span key={`item-${index}-${arrayIndex}-${fieldIndex}`}
                                              className="array-field">
                                                <span className="array-key">{key}: </span><span
                                            className="array-value">{fieldset[key]}</span>
                                            </span>
                                    )
                                })
                            }
                        </p>
                    )
                })
            }
        } else {
            if (value) {
                return <div>{value}</div>;
            }
        }
    };

    exportPdf() {
        // console.log(this.table, this.refs, ReactDOM.findDOMNode('table'));
        if (Meteor.isClient) {
            // console.log($('.data-table'));
            let data = [];
            //todo: add spinner until this is done
            let i = 0;
            const images = $('.data-table img');
            let convertPhotoSource = (done)=> {
                // console.log(images[i].src);
                getBinary(images[i].src, (err, res)=> {
                    // console.log(`Response: ${res}`);
                    // console.log(images[i]);
                    images[i].src = `${res}`;
                    i++;
                    if (i < images.length) {
                        convertPhotoSource(done)
                    } else {
                        done()
                    }
                });
            };
            convertPhotoSource(()=> {
                //todo: stop spinner
                console.log("Images swapped!");
                let tableData = $('.data-table tr');
                let newHeader = (header, pageBreak)=> {
                    if (typeof header !== 'undefined') {
                        let margin = pageBreak === 'before'? [0,0,0,10]: [0,30,0,10];
                        data.push({text: header, style: 'header', margin, pageBreak});
                    }
                };
                let oldHeader;
                tableData.map((index, row)=> {
                    let header = $(row).data('title');
                    // console.log(header, nextHeader, header === nextHeader);
                    let content = $($(row).children('td')[1]);
                    let label = $($(row).children('td')[0]);
                    // console.log(content, content.data(), content.data('type'));
                    if (content.data('type') === 'photo') {
                        let imageArray = $(content).find('img');
                        if (imageArray.length) {
                            newHeader(header, 'before');
                            imageArray.map((index, image)=> {
                                data.push({image: image.src, margin: [0,10,0,10], fit: [510, 310]})
                            });
                            oldHeader = oldHeader !== header? header: oldHeader;
                        }
                    } else if (content.data('type') === 'array') {
                        let array = content.find('p');
                        if (array.length) {
                            array.map((index, p)=> {
                                newHeader(`${header} ${index + 1}`);
                                let keys = $(p).find('span.array-key').map((i, key)=> {
                                    return $(key).text();
                                }).toArray();
                                let values = $(p).find('span.array-value').map((i, value)=> {
                                    return $(value).text();
                                }).toArray();
                                // console.log(keys, values);
                                keys.map((k, i)=> {
                                    data.push({columns: [{text: k, bold: true, width: '33%'}, values[i]]});
                                });
                            });
                            oldHeader = oldHeader !== header? header: oldHeader;
                        }
                    } else {
                        if (label.text().length) {
                            if(oldHeader !== header) newHeader(header);
                            data.push({columns: [{text: label.text(), bold: true, width: '33%'}, content.text()]});
                            oldHeader = oldHeader !== header? header: oldHeader;
                        }
                    }
                });
                console.log(data);
                pdfMake.createPdf({
                    content: data,
                    styles: {header: {fontSize: 22, bold: true}},
                    pageSize: 'LETTER',
                    pageOrientation: 'portrait',
                    info: {
                        title: 'Incident Report',
                        author: 'Driver',
                        subject: 'Documentation regarding the accident',
                    }
                }).open();
            });
        }
    }

    render() {
        return (
            <Layout>
                <canvas id="data-image"/>
                <Row className="content-wrapper">
                    <Col xs={10} xsOffset={1}>
                        <br/>
                        <Button onClick={this.exportPdf} className="pull-right">Export PDF</Button>
                        <br/>
                        <Table className="data-table">
                            <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderRow()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Layout>
        )
    }
}