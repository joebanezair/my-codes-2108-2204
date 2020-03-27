import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import App from './App';
import Support from './Support';
import Mobile from './Mobile';
import Share from './Share';
// 主要是用于在生产环境中为用户在本地创建一个service worker 来缓存资源到本地，提升应用的访问速度
import registerServiceWorker from './utils/registerServiceWorker';

const home = document.getElementById('laiwan');
const userAgent = window.navigator.userAgent.toLowerCase();
if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
    ReactDOM.render(
        <Router>
            <Route path="/" exact component={Mobile} />
            <Route path="/share" component={Share} />
        </Router>,
        home,
    );
} else {
    ReactDOM.render(
        (
            <Router>
                <Route path="/" exact component={App} />
                <Route path="/support" component={Support} />
            </Router>
        ), home,
    );
}
registerServiceWorker(); // 注册一个离线的缓存
