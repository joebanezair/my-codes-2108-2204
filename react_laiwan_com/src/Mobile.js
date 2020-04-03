/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import axios from 'axios';
import './view/style/mobile.css';
import logo from './source/logo.png';
import config from './config.json';
import iosStore from './source/btn_mobile_appstore.png';
import googleStore from './source/btn_mobile_googel.png';
import local from './source/btn_mobile_local_download.png';
import wechatPrompt from './source/img-prompt.png';
import getAndroidVersion from './utils/GetAndroidVersion';


const androidStaging = 'https://api.shafayouxi.org/v1/app/com.ac.laiwanDev/android';
const androidProduction = 'https://api.laiwan.io/v1/app/com.ac.laiwan/android';
const iosStoreLink = 'https://apps.apple.com/app/%E6%9D%A5%E7%8E%A9-%E5%BE%B7%E5%B7%9E%E6%89%91%E5%85%8B%E7%BA%A6%E5%B1%80%E7%A5%9E%E5%99%A8/id1394482339';
const googleStoreLink = 'https://play.google.com/store/apps/details?id=com.ac.laiwan';

export default class Mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localLink: '',
            isWechatBrowser: false,
        };
    }

    async componentDidMount() {
        this._isWechatBrowser();
        const localLink = await this._getAndroidAddress();
        this.setState({ localLink });
    }

    _isWechatBrowser = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('micromessenger') !== -1) {
            this.setState({ isWechatBrowser: true });
        }
    }

    _isAvailableAndroidVersion = () => {
        const version = getAndroidVersion();
        if (version[0] > 7) {
            return true;
        }
        if (version[0] >= 7 && version[2] >= 1) {
            return true;
        }
        return false;
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
                    } else {
                        console.log('请求地址失败');
                    }
                });
            });
        } catch (error) {
            return new Error(error);
        }
    }

    _renderNavigationBar = () => (
        <div className="mobile_navigation_bar">
            <div className="mobile_row_center">
                <img src={logo} className="mobile_logo" />
                <p className="mobile_nav_title">来玩</p>
            </div>
        </div>
    )

    _renderTitleContent = () => (
        <div className="mobile_title_content">
            <p className="mobile_title">来玩APP</p>
            <p className="mobile_title">德州扑克约局神器</p>
            <p className="mobile_title">斗地主私人房间</p>
        </div>
    )

    _renderDownloadContent = () => {
        const { localLink } = this.state;
        return (
            <div className="mobile_download_content">
                <div className="mobile_img_content">
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
        );
    }

    _renderWechatPrompt = () => (
        <div className="wechat_prompt">
            <img src={wechatPrompt} />
        </div>
    )


    render() {
        const { isWechatBrowser } = this.state;
        return (
            <div className="page">
                { !isWechatBrowser ? this._renderNavigationBar() : this._renderWechatPrompt()}
                <div className="mobile_download">
                    {this._renderTitleContent()}
                    {!isWechatBrowser ? this._renderDownloadContent() : null}
                </div>
            </div>
        );
    }
}
