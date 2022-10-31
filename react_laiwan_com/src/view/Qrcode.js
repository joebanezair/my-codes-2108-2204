import React, { Component } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import icon from '../source/icon.png';

// const icon = require('./source/icon.png');


export default class Qrcode extends Component {
    render() {
        const { downloadUrl } = this.props
        return (
            <QRCodeSVG
                value={downloadUrl}
                size={120}

                style={{border: '#fff solid 4px'}}
                imageSettings={{
                    src: icon,
                    excavate: true,
                    height: 25,
                    width: 25,
                }}
            />
        );
    }
}
