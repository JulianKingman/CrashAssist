import React, {Component} from 'react';
import {Row, Col, Grid} from 'react-bootstrap';

export default class Footer extends Component {
    render() {
        return (
            <Row componentClass="section" className="copyright-section">
                <Col xs={12}>
                    <Grid>
                        © 2016 Designman
                    </Grid>
                </Col>
            </Row>
        )
    }
}