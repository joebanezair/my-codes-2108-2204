import React, { Component } from 'react';
import './view/style/support.css';
import Dialog from './view/Dialog';

export default class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const url = window.location.href;
        if (url.indexOf('support') !== -1) {
            const oHtml = document.getElementsByTagName('html')[0];
            oHtml.style.fontSize = `${16}px`;
        }
    }


    render() {
        return (
            <div className="page">
                <div className="row_center container">
                    <Dialog />
                </div>
            </div>
        );
    }
}
