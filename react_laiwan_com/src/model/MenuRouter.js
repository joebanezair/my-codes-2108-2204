import React from 'react';

import Home from '@material-ui/icons/AccountBalance';
import Glossary from '@material-ui/icons/Apps';
import Tutorial from '@material-ui/icons/AssignmentInd';

const routers = [
    {
        path: '/',
        title: '首页',
        subTitle: 'home',
        icon: <Home />,
    },
    {
        path: '/glossary',
        title: '术语表',
        subTitle: 'glossary',
        icon: <Glossary />,
    },
    {
        path: '/tutorial',
        title: '注册Apple ID教程',
        subTitle: 'tutorial',
        icon: <Tutorial />,
    },
];

export default routers;
