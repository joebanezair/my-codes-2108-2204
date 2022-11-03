import React from 'react'
import styles from '../style/HomeScreen.module.css'

const DownloadButton = ({ href, title, subtitle, icon }) =>
    <a href={href}>
        <div
            className={styles.downloadButton}
        >{icon &&
        <img src={icon} alt={ title } />}
            <div style={{textAlign:'center'}}>
                <div style={{color:'white',fontSize:'1.6rem',letterSpacing:'0.5rem'}}>{ title }</div>
                <div style={{ color: 'white',fontSize:'0.8rem',letterSpacing:'0.3rem' }}>{ subtitle }</div>
            </div>
        </div>
    </a>

export default DownloadButton