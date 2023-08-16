import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/HomeScreen.module.css';
import phoneScreenshot from '../image/img-phone.png';
import h5News from '../image/img-news.png';
import h5Version1 from '../image/btn-h-5-blue.png';
import h5Version2 from '../image/btn-h-5-green.png';
import h5Tutorial1 from '../image/btn-phone-home-blue.png';
import h5Tutorial2 from '../image/btn-phone-home-green.png';
import googleDownload from '../image/btn-googel.png';
import localDownload from '../image/btn-local-download.png';
import NavBar from '../../../common/view/NavBar';
import { googleStoreLink } from '../../../constant/Constant';
import {
    server_type as serverType,
    h5_version_url_1 as h5VersionUrl1,
    h5_version_url_2 as h5VersionUrl2,
    android_download_url as androidDownloadUrl,
    android_huawei_download_url as androidHuaweiDownloadUrl
} from '../../../config.json';
import DownloadModalForIOS from '../view/DownloadIOSModal';
import Qrcode from '../../../view/Qrcode';
import DownloadButton from '../view/DownloadButton';
import getLocalDownloadVersion from '../../../utils/getLocalDownloadVersion';

const HomeScreen = () => {
    const [localDownloadUrl, setLocalDownloadUrl] = useState('');
    const [qrcodeDownloadUrl, setQrcodeDownloadUrl] = useState('')
    const [huaweiDownloadUrl, setHuaweiDownloadUrl] = useState('')

    useEffect(() => {
        fetch(androidDownloadUrl)
            .then((response) => response.json())
            .then(({ apk_files: apkFiles }) => {
                const url = `https://${window.location.hostname}/apk/${apkFiles[0]}`;
                setLocalDownloadUrl(url);
                setQrcodeDownloadUrl(url);
                // TODO: 缺少错误反馈，之后加
            })
            .catch((error) => {
                console.log(`error .meesage :: ${error.message}`);
            });

        if (serverType === 'staging') {
            fetch(androidHuaweiDownloadUrl)
                .then((response) => response.json())
                .then((data) => {
                    const { ok, result } = data;
                    if (ok) {
                        setHuaweiDownloadUrl(result.cdn_download_url)
                    }
                // TODO: 缺少错误反馈，之后加
                });
        }
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
                        <img
                            className={styles.screenshot}
                            src={phoneScreenshot}
                            alt="应用截图"
                        />
                    </div>
                    <div>
                        <img
                            className={styles.h5News}
                            src={h5News}
                            alt="H5 版上线"
                        />
                        <div className={styles.title}>德州扑克约局社区</div>
                        <div className={styles.subtitle}>一起，来玩</div>
                        <div className={styles.downloadMethod}>
                            <div className={styles.tutorialContainer}>
                                <a href={h5VersionUrl1}>
                                    <img
                                        className={styles.h5Button}
                                        src={h5Version1}
                                        alt="H5 版本一"
                                    />
                                </a>
                                <Link
                                    className={styles.h5Tutorual}
                                    to="/h5-tutorial/laiwan-life"
                                >
                                    <img
                                        className={styles.h5TutorualImage}
                                        src={h5Tutorial1}
                                        alt="如何添加到桌面"
                                    />
                                </Link>
                            </div>
                            <div className={styles.tutorialContainer}>
                                <a href={h5VersionUrl2}>
                                    <img
                                        className={styles.h5Button}
                                        src={h5Version2}
                                        alt="H5 版本二"
                                    />
                                </a>
                                <Link
                                    className={styles.h5Tutorual}
                                    to="/h5-tutorial/laiwanpai-com"
                                >
                                    <img
                                        className={styles.h5TutorualImage}
                                        src={h5Tutorial2}
                                        alt="如何添加到桌面"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className={styles.downloadMethod}>
                            <DownloadModalForIOS />
                            <a href={googleStoreLink}>
                                <img
                                    className={styles.buttonImage}
                                    src={googleDownload}
                                    alt="谷歌下载"
                                />
                            </a>
                            <div className={styles.localContainer}>
                                <a href={localDownloadUrl}>
                                    <img
                                        className={styles.buttonImage}
                                        src={localDownload}
                                        alt="本地下载"
                                    />
                                </a>
                                <span>{`最新版本: ${getLocalDownloadVersion(localDownloadUrl)}`}</span>
                            </div>
                            {serverType === 'staging' ?
                                <DownloadButton href={huaweiDownloadUrl} title="华为版下载" subtitle="(支持华为)" />
                                : <></>
                            }
                        </div>
                    </div>
                    <div className={styles.qrcodeContainer}>
                        <Qrcode downloadUrl={qrcodeDownloadUrl} />
                        <div className={styles.qrcodeText}>手机扫码下载</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
