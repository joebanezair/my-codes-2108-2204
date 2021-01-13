/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import BackgroundImage from 'react-background-image';
import './view/style/home.css';
import axios from 'axios';
import bigPhone from './source/img-phone.png';
import smallPhone from './source/small-phone.png';
import logo from './source/logo.png';
import qrcode from './source/qrcode.jpeg';
import googleStore from './source/btn_googel.png';
import local from './source/btn_local_download.png';
import config from './config.json';
import {
    androidStagingUrl, androidProductionUrl, googleStoreLink,
} from './constant/Constant';
import IosDownloadModal from './IosDownloadModal';

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
                        <a href="/" label="laiwan"><img src={logo} className="logo" /></a>
                        <a href="/" label="laiwan"><p className="nav_title">来玩</p></a>
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
                            <p className="title">来玩德州扑克约局社区</p>
                            <p className="title">您的私人好友房</p>
                        </div>
                        <div className="subtitle_content">
                            <div>
                                <p className="subtitle">德州扑克</p>
                                <p className="subtitle">斗地主</p>
                            </div>
                            <div>
                                <p className="subtitle">德州短牌</p>
                                <p className="subtitle">拼三张</p>
                            </div>
                        </div>
                        <div className="download_content">
                            <div className="qrcode_content">
                                <img src={qrcode} className="qrcode" />
                                <p>手机扫码下载</p>
                            </div>
                            <div className="img_content">
                                <IosDownloadModal />
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
