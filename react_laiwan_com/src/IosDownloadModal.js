/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';
import iosStore from './source/btn_appstore.png';
import { iosStoreLink } from './constant/Constant';
import logo from './source/logo.png';
import close from './view/image/icon_close.png';
import NavigatorJudge from './utils/navigatorJudge';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: NavigatorJudge.isMobile() ? 300 : 400,
        height: NavigatorJudge.isMobile() ? 200 : 300,
        backgroundColor: 'white',
        border: '2px solid white',
        borderRadius: '8px',
        boxShadow: theme.shadows[5],
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        fontSize: '10px',
        textAlign: 'center',
        letterSpacing: '2.4px',
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        fontSize: '10px',
        color: 'red',
        letterSpacing: '1.8px',
        textAlign: 'center',
    },
    linkButton: {
        backgroundColor: 'RoyalBlue',
        width: NavigatorJudge.isMobile() ? 90 : 100,
        height: NavigatorJudge.isMobile() ? 30 : 40,
        border: '2px solid RoyalBlue',
        borderRadius: '0.2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    downloadTitle: {
        fontSize: NavigatorJudge.isMobile() ? '7px' : '10px',
        color: 'white',
    },
    logo: {
        width: '5vh',
        height: '5.5vh',
    },
    close: {
        position: 'absolute',
        right: '1px',
        top: '1px',
    },
    downloadImage: {
        width: '14.37rem',
        height: ' 4.87rem',
    },
}));

export default function IosDownloadModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div className={classes.paper}>
            <img src={close} alt="close" className={classes.close} onClick={handleClose} onKeyDown={handleClose} />
            <img src={logo} alt="logo" className={classes.logo} />
            <p className={classes.title}>您在非中国大陆地区</p>
            <a href={iosStoreLink}>
                <div className={classes.linkButton}>
                    <p className={classes.downloadTitle}>非中国大陆下载</p>
                </div>
            </a>
            <p className={classes.title}>您在中国大陆</p>
            <Link to="tutorial">
                <div className={classes.linkButton}>
                    <p className={classes.downloadTitle}>中国大陆下载</p>
                </div>
            </Link>
        </div>
    );

    return (
        <div>
            <div onClick={handleOpen} role="presentation" onKeyDown={handleOpen}>
                <img className={classes.downloadImage} src={iosStore} alt="ios_store" />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                {body}
            </Modal>
        </div>
    );
}
