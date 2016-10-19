import React, {Component} from 'react';
import Navigation from './Navigation.jsx';
import Footer from './Footer.jsx';
import {Grid} from 'react-bootstrap';

export default class Layout extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Grid fluid={true}>
                <Navigation/>
                {this.props.children}
                <Footer/>
            </Grid>
        )
    }
}