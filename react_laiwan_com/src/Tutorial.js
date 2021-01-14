import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import './view/style/tutorial.css';
import gfm from 'remark-gfm';
import TemporaryDrawer from './TemporaryDrawer';
import logo from './source/logo.png';
import NavigatorJudge from './utils/navigatorJudge';
import tutorialMd from './md/tutorial.md';
import laiwan from './view/image/laiwan.png';

export default class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    componentDidMount() {
        if (document.location.toString().indexOf('tutorial/') === -1) {
            document.location.href += '/';
            document.location.reload();
            return;
        }
        this.setState({ show: true });
    }

    _renderPcNavigator = () => (
        <div className="tutorial_navigation_bar">
            <div className="row_center">
                <a href="/" label="laiwan"><img src={logo} className="tutorial_logo" alt="logo" /></a>
                <a href="/" label="laiwan"><p className="tutorial_nav_title">来玩</p></a>
            </div>
            <div className="row_center">
                <a href="/"><p className="tutorial_nav_subtitle">首页</p></a>
                <a href="/glossary"><p className="tutorial_nav_subtitle">德州术语表</p></a>
            </div>
        </div>
    )

    render() {
        const { show } = this.state;
        return (
            show
                ? (
                    <div>
                        {NavigatorJudge.isMobile() ? <TemporaryDrawer className="temporary_drawer" />
                        : this._renderPcNavigator()}
                        <div className="tutorial_content">
                            <p className="can_not_download_text">(中国大陆暂时无法下载)</p>
                            <div className="reactMarkDown">
                                <ReactMarkdown plugins={[gfm]} source={tutorialMd} />
                            </div>
                            <img src={laiwan} alt="laiwan" />
                        </div>
                    </div>
                ) : <div />
        );
    }
}
