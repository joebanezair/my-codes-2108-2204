import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import icon from '../source/icon.png';

// const icon = require('./source/icon.png');

export default class Qrcode extends Component {
    render() {
        return (
            <QRCode
                value="https://laiwan.io/download/qrcode"
                size={207}
                renderAs="svg"
                imageSettings={{
                    src: icon,
                    excavate: true,
                    height: 30,
                    width: 30,
                }}
            />
        );
    }
}
