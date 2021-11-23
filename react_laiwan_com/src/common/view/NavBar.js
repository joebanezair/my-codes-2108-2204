import React from 'react';
import styles from '../style/NavBar.module.css';
import logo from '../../source/logo.png';

const NavBar = ({ className = '' }) => (
    <div className={`${styles.container} ${className}`}>
        <div className={styles.logoContainer}>
            <img className={styles.logoImage} src={logo} alt="logo" />
            <h2 className={styles.logoText}>来玩</h2>
        </div>
        <div className={styles.navList}>
            <a className={styles.navItem} href="/">首页</a>
            <a className={styles.navItem} href="/glossary">德州扑克术语表</a>
        </div>
    </div>
);

export default NavBar;
