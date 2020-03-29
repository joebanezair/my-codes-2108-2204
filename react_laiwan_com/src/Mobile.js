/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import axios from 'axios';
import './view/style/mobile.css';
import logo from './source/logo.png';
import config from './config.json';
import iosStore from './source/btn-app-store.png';
import googleStore from './source/btn-googel.png';
import local from './source/btn-local-download.png';


const androidStaging = 'https://api.shafayouxi.org/v1/app/com.ac.laiwanDev/android';
const androidProduction = 'https://api.laiwan.io/v1/app/com.ac.laiwan/android';
const iosStoreLink = 'https://apps.apple.com/app/%E6%9D%A5%E7%8E%A9-%E5%BE%B7%E5%B7%9E%E6%89%91%E5%85%8B%E7%BA%A6%E5%B1%80%E7%A5%9E%E5%99%A8/id1394482339';
const googleStoreLink = 'https://play.google.com/store/apps/details?id=com.ac.laiwan';

export default class Mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localLink: '',
        };
    }

    async componentDidMount() {
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
                <div className="mobile_navigation_bar">
                    <div className="mobile_row_center">
                        <img src={logo} className="mobile_logo" />
                        <p className="mobile_nav_title">来玩</p>
                    </div>
                </div>
                <div className="mobile_download">
                    <div className="mobile_title_content">
                        <p className="mobile_title">来玩App</p>
                        <p className="mobile_subtitle">downnload</p>
                        <p className="mobile_title">德州扑克约局神器</p>
                        <p className="mobile_title">斗地主私人房间</p>
                    </div>
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
                </div>
                <div className="bottom_tips">
                    <p className="tips">*来玩仅支持10.1版本以上的苹果手机及7.0版本以上的安卓手机</p>
                </div>
            </div>
        );
    }
}
