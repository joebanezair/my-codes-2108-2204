import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tutorialImg from './source/img_registered_apple_id.png';
import './view/style/tutorial.css';
import TemporaryDrawer from './TemporaryDrawer';
import logo from './source/logo.png';
import NavigatorJudge from './utils/navigatorJudge';

export default class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _renderPcNavigator = () => (
        <div className="navigation_bar">
            <div className="row_center">
                <img src={logo} className="logo" alt="logo" />
                <p className="tutorial_nav_title">来玩</p>
            </div>
            <div className="row_center">
                <a href="/"><p className="tutorial_nav_subtitle">首页</p></a>
                <a href="/glossary"><p className="tutorial_nav_subtitle">德州术语表</p></a>
                <Link to="/tutorial"><p className="tutorial_nav_subtitle">注册其他/国家苹果账号教程</p></Link>
            </div>
        </div>
    )

    render() {
        return (
            <div>
                {NavigatorJudge.isMobile() ? <TemporaryDrawer className="temporary_drawer" />
                : this._renderPcNavigator()}
                <div className="tutorial_content">
                    <img src={tutorialImg} alt="tutorial" />
                </div>
            </div>
        );
    }
}
