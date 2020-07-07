import React, {Component} from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import pkg from '../../../../package.json';

export default class Footer extends Component {
    render() {
        return (
            <Row componentClass="section" className="copyright-section">
                <Col xs={12}>
                    <Grid>
                        © 2018 Designman
                    </Grid>
                    <Grid>
                        {`Version ${pkg.version}`}
                    </Grid>
                </Col>
            </Row>
        )
    }
}