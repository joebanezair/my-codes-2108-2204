import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 主要是用于在生产环境中为用户在本地创建一个service worker 来缓存资源到本地，提升应用的访问速度
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('laiwan'));

registerServiceWorker(); // 注册一个离线的缓存
