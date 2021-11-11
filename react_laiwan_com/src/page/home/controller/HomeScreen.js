import React, { useEffect, useState } from 'react';
import styles from '../style/HomeScreen.module.css';
import phoneScreenshot from '../image/img-phone.png';
import h5News from '../image/img-news.png';
import h5Version from '../image/btn-h-5.png';
import googleDownload from '../image/btn-googel.png';
import localDownload from '../image/btn-local-download.png';
import qrcodeDownload from '../image/qrcode.jpg';
import NavBar from '../view/NavBar';
import { googleStoreLink } from '../../../constant/Constant';
import {
    h5_version_url as h5VersionUrl,
    android_download_url as androidDownloadUrl,
} from '../../../config.json';
import IosDownloadModal from '../../../IosDownloadModal';

const HomeScreen = () => {
    const [localDownloadUrl, setLocalDownloadUrl] = useState('');

    useEffect(() => {
        fetch(androidDownloadUrl)
            .then((response) => response.json())
            .then((data) => {
                const { ok, result } = data;
                if (ok) {
                    setLocalDownloadUrl(result.cdn_download_url);
                }
                // TODO: 缺少错误反馈，之后加
            });
    }, []);

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <NavBar />
                <div className={styles.content}>
                    <img className={styles.phoneScreenshot} src={phoneScreenshot} alt="应用截图" />
                    <div>
                        <img className={styles.h5News} src={h5News} alt="H5 版上线" />
                        <div className={styles.title}>德州扑克约局社区</div>
                        <div className={styles.subtitle}>一起，来玩</div>
                        <div className={styles.downloadMethod}>
                            <a href={h5VersionUrl}>
                                <img src={h5Version} alt="H5 版本" />
                            </a>
                            <a href={googleStoreLink}>
                                <img src={googleDownload} alt="谷歌下载" />
                            </a>
                            <IosDownloadModal />
                            <a href={localDownloadUrl}>
                                <img src={localDownload} alt="本地下载" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <img className={styles.qrcodeImage} src={qrcodeDownload} alt="二维码" />
                        <div className={styles.qrcodeText}>手机扫码下载</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
