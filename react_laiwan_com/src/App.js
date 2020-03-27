/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import BackgroundImage from 'react-background-image';
import './view/style/home.css';
import axios from 'axios';
import bigPhone from './source/img-phone.png';
import smallPhone from './source/small-phone.png';
import logo from './source/logo.png';
import qrcode from './source/qrcode.png';
import iosStore from './source/btn-app-store.png';
import googleStore from './source/btn-googel.png';
import local from './source/btn-local-download.png';
import config from '../config.json';

const androidStaging = 'https://api.shafayouxi.org/v1/app/com.ac.laiwanDev/android';
const androidProduction = 'https://api.laiwan.io/v1/app/com.ac.laiwan/android';
const iosStoreLink = 'https://apps.apple.com/app/%E6%9D%A5%E7%8E%A9-%E5%BE%B7%E5%B7%9E%E6%89%91%E5%85%8B%E7%BA%A6%E5%B1%80%E7%A5%9E%E5%99%A8/id1394482339';
const googleStoreLink = 'https://play.google.com/store/apps/details?id=com.ac.laiwan';

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
                url = androidStaging;
            } else {
                url = androidProduction;
            }
            return new Promise((reslove) => {
                axios(url).then((res) => {
                    if (res.data.ok) {
                        reslove(res.data.result.download_url);
                        console.log(res.data.result);
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
                            <p className="title">来玩App</p>
                            <p className="subtitle">downnload</p>
                            <p className="title">德州扑克约局神器</p>
                            <p className="title">斗地主私人房间</p>
                        </div>
                        <div className="download_content">
                            <div className="qrcode_content">
                                <img src={qrcode} className="qrcode" />
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
