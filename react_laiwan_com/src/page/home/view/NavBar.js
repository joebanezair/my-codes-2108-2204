import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/NavBar.module.css';
import logo from '../../../source/logo.png';

const NavBar = () => (
    <div className={styles.container}>
        <div className={styles.logoContainer}>
            <img className={styles.logoImage} src={logo} alt="logo" />
            <h2 className={styles.logoText}>来玩</h2>
        </div>
        <div className={styles.navList}>
            <a className={styles.navItem} href="/">首页</a>
            <a className={styles.navItem} href="/glossary">德州扑克术语表</a>
            <Link className={styles.navItem} to="/h5-tutorial">H5手机版</Link>
        </div>
    </div>
);

export default NavBar;
