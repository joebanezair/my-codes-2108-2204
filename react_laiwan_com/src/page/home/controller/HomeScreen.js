import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/HomeScreen.module.css';
import phoneScreenshot from '../image/img-phone.png';
import h5News from '../image/img-news.png';
import h5Version1 from '../image/btn-h5-1.png';
import h5Version2 from '../image/btn-h5-2.png';
import h5Tutorual from '../image/btn-phone-home.png';
import googleDownload from '../image/btn-googel.png';
import localDownload from '../image/btn-local-download.png';
import qrcodeDownload from '../image/qrcode.jpg';
import NavBar from '../../../common/view/NavBar';
import { googleStoreLink } from '../../../constant/Constant';
import {
    h5_version_url_1 as h5VersionUrl1,
    h5_version_url_2 as h5VersionUrl2,
    android_download_url as androidDownloadUrl,
} from '../../../config.json';
import DownloadModalForIOS from '../view/DownloadIOSModal';

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
                    <div className={styles.screenshotContainer}>
                        <div className={styles.circle} />
                        <div className={`${styles.circle} ${styles.second}`} />
                        <div className={`${styles.circle} ${styles.third}`} />
                        <img className={styles.screenshot} src={phoneScreenshot} alt="应用截图" />
                    </div>
                    <div>
                        <img className={styles.h5News} src={h5News} alt="H5 版上线" />
                        <div className={styles.title}>德州扑克约局社区</div>
                        <div className={styles.subtitle}>一起，来玩</div>
                        <div className={styles.downloadMethod}>
                            <a href={h5VersionUrl1}>
                                <img className={styles.buttonImage} src={h5Version1} alt="H5 版本一" />
                            </a>
                            <a href={h5VersionUrl2}>
                                <img className={styles.buttonImage} src={h5Version2} alt="H5 版本二" />
                            </a>
                        </div>
                        <Link className={styles.h5Tutorual} to="/h5-tutorial">
                            <img className={styles.h5TutorualImage} src={h5Tutorual} alt="如何添加到桌面" />
                        </Link>
                        <div className={styles.downloadMethod}>
                            <DownloadModalForIOS />
                            <a href={googleStoreLink}>
                                <img className={styles.buttonImage} src={googleDownload} alt="谷歌下载" />
                            </a>
                            <a href={localDownloadUrl}>
                                <img className={styles.buttonImage} src={localDownload} alt="本地下载" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.qrcodeContainer}>
                        <img className={styles.qrcodeImage} src={qrcodeDownload} alt="二维码" />
                        <div className={styles.qrcodeText}>手机扫码下载</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
