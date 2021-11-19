import React from 'react';
import { h5_version_url as h5VersionUrl } from '../../../config.json';
import imgBannerH5 from '../image/img-banner-h5.png';
import imgTutorial1 from '../image/img-tutorials-1.png';
import imgTutorial2 from '../image/img-tutorials-2.png';
import imgTutorial3 from '../image/img-tutorials-3.png';
import imgTutorial4 from '../image/img-tutorials-4.png';
import imgTutorial5 from '../image/img-tutorials-5.png';
import styles from '../style/H5Tutorial.module.css';

const H5Tutorial = () => (
    <div className={styles.container}>
        <div className={styles.main}>
            <img className={styles.banner} src={imgBannerH5} alt="横幅" />
            <div className={styles.section}>
                <h2 className={styles.title}>什么是H5？</h2>
                <p className={styles.content}>
                    H5是一系列制作网页互动效果的技术集合，即H5就是移动端的web
                    页面。H5游戏就是一种即点即玩的游戏，浏览器加载的，不用下载
                    安装就能玩。登陆来玩H5，可以不占内存，同时也可以和苹果手机
                    和安卓手机的玩家同玩。
                </p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.title}>
                    请您使用
                    <span className={styles.purpleyBlueText}>手机</span>
                    浏览器打开来玩H5手机版链接
                </h2>
                <a className={`${styles.content} ${styles.purpleyBlueText}`} href={h5VersionUrl}>{h5VersionUrl}</a>
            </div>
            <div className={styles.section}>
                <h2 className={styles.title}>将来玩H5添加至手机主屏幕</h2>
                <ol className={styles.tutorialList}>
                    <li>
                        <h3 className={styles.title}>一、在手机浏览器中（苹果机使用Safari）打开来玩网页：</h3>
                        <a className={styles.tutorial1Link} href={h5VersionUrl}>{h5VersionUrl}</a>
                        <img src={imgTutorial1} alt="教程图片1" />
                    </li>
                    <li>
                        <h3 className={styles.title}>二、点击页面下方分享图标</h3>
                        <img src={imgTutorial2} alt="教程图片2" />
                    </li>
                    <li>
                        <h3 className={styles.title}>三、下滑页面，点击【添加到主屏幕】</h3>
                        <img src={imgTutorial3} alt="教程图片3" />
                    </li>
                    <li>
                        <h3 className={styles.title}>四、确认【添加】</h3>
                        <img src={imgTutorial4} alt="教程图片4" />
                    </li>
                    <li>
                        <h3 className={styles.title}>五、回到手机主屏幕就能看到来玩的图标了</h3>
                        <img src={imgTutorial5} alt="教程图片5" />
                    </li>
                </ol>
            </div>
        </div>
    </div>
);

export default H5Tutorial;
