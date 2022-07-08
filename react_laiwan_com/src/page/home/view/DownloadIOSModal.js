/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';
import iosStore from '../image/btn-app-store.png';
import { iosStoreLink } from '../../../constant/Constant';
import close from '../../../view/image/icon_close.png';
import NavigatorJudge from '../../../utils/navigatorJudge';
import BTN_APPLE_DOWNLOAD from '../image/btn-apple-download.png';
import BTN_TUTORIAL from '../image/btn-tutorial.png';
import ICON_PROMPT from '../image/img-prompt.png';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 750,
        height: 500,
        backgroundColor: 'white',
        border: '2px solid white',
        borderRadius: '30px',
        boxShadow: theme.shadows[5],
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        fontSize: '24px',
        textAlign: 'center',
        letterSpacing: '2.4px',
        color: '#333333',
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
        width: '71px',
        height: '58px',
    },
    close: {
        position: 'absolute',
        right: '15px',
        top: '15px',
    },
    downloadImage: {
        width: '17.5rem',
        height: ' 4.87rem',
    },
    prompt: {
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    promptText: {
        fontSize: '26px',
        color: '#ff4444',
        marginLeft: '10px',
        textAlign: 'center',
    },
    downlowdButton: {
        width: '300px',
        height: '100px',
    },
}));

export default function IOSDownloadModal() {
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
            <div className={classes.prompt}>
                <img src={ICON_PROMPT} alt="logo" className={classes.logo} />
                <p className={classes.promptText}>中国大陆地区暂时无法下载来玩</p>
            </div>
            <p className={classes.title}>已有其他地区AppleID，可直接下载来玩</p>
            <a href={iosStoreLink}>
                <img className={classes.downlowdButton} src={BTN_APPLE_DOWNLOAD} alt="iosToreLink" />
            </a>
            <p className={classes.title}>中国大陆地区下载教程</p>
            <Link to="tutorial">
                <img className={classes.downlowdButton} src={BTN_TUTORIAL} alt="tutorial" />
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
