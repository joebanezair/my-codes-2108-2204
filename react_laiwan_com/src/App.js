/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import BackgroundImage from 'react-background-image';
import './view/style/home.css';
import axios from 'axios';
import bigPhone from './source/img-phone.png';
import smallPhone from './source/small-phone.png';
import logo from './source/logo.png';
import qrcode from './source/qrcode.jpeg';
import iosStore from './source/btn_appstore.png';
import googleStore from './source/btn_googel.png';
import local from './source/btn_local_download.png';
import config from './config.json';
import {
    androidStagingUrl, androidProductionUrl, iosStoreLink, googleStoreLink,
} from './constant/Constant';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localLink: '',
        };
    }

    async componentDidMount() {
        const url = window.location.href;
        if (url.indexOf('support') === -1) {
            const oHtml = document.getElementsByTagName('html')[0];
            const width = oHtml.clientWidth;
            oHtml.style.fontSize = `${12 * (width / 320)}px`;
        }
        const localLink = await this._getAndroidAddress();
        this.setState({ localLink });
    }

    _getAndroidAddress = () => {
        try {
            let url = '';
            if (config.server_type === 'staging') {
                url = androidStagingUrl;
            } else {
                url = androidProductionUrl;
            }
            return new Promise((reslove) => {
                axios(url).then((res) => {
                    if (res.data.ok) {
                        reslove(res.data.result.cdn_download_url);
                    } else {
                        console.log('请求地址失败');
                    }
                });
            });
        } catch (error) {
            return new Error(error);
        }
    }


    render() {
        const { localLink } = this.state;
        return (
            <div className="page">
                <div className="navigation_bar">
                    <div className="row_center">
                        <img src={logo} className="logo" />
                        <p className="nav_title">来玩</p>
                    </div>
                    <div className="row_center">
                        <a href="/"><p className="nav_subtitle">首页</p></a>
                        <a href="/glossary"><p className="nav_subtitle">德州术语表</p></a>
                    </div>
                </div>
                <div className="content">
                    <div className="phone_content">
                        <BackgroundImage
                            placeholder={smallPhone}
                            src={bigPhone}
                            className="phone"
                        />
                    </div>
                    <div className="download">
                        <div className="title_content">
                            <p className="title">来玩APP</p>
                            <p className="title">德州扑克约局神器</p>
                            <p className="title">斗地主私人房间</p>
                        </div>
                        <div className="download_content">
                            <div className="qrcode_content">
                                <img src={qrcode} className="qrcode" />
                                <p>手机扫码下载</p>
                            </div>
                            <div className="img_content">
                                <a href={iosStoreLink}>
                                    <img src={iosStore} />
                                </a>
                                <a href={googleStoreLink}>
                                    <img src={googleStore} />
                                </a>
                                <a href={localLink}>
                                    <img src={local} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
