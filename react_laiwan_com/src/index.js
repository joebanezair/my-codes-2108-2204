import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
// 主要是用于在生产环境中为用户在本地创建一个service worker 来缓存资源到本地，提升应用的访问速度
import registerServiceWorker from './utils/registerServiceWorker';
import MobileRouters from './model/MobileRouter';
import BrowserRouters from './model/BrowserRouter';
import NavigatorJudge from './utils/navigatorJudge';

const home = document.getElementById('laiwan');
if (NavigatorJudge.isMobile()) {
    ReactDOM.render(
        <Router>
            {MobileRouters.map((router) => (
                <Route
                    path={router.path}
                    component={router.component}
                    exact={router.exact}
                    key={router.path}
                />
            ))}
        </Router>,
        home,
    );
} else {
    ReactDOM.render(
        <Router>
            {BrowserRouters.map((router) => (
                <Route
                    path={router.path}
                    component={router.component}
                    exact={router.exact}
                    key={router.path}
                />
            ))}
        </Router>,
        home,
    );
}
registerServiceWorker(); // 注册一个离线的缓存
