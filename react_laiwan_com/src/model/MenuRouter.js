import React from 'react';

import Home from '@material-ui/icons/AccountBalance';
import Glossary from '@material-ui/icons/Apps';

const routers = [
    {
        path: '/',
        title: '首页',
        subTitle: 'home',
        icon: <Home />,
    },
    {
        path: '/glossary',
        title: '德州术语表',
        subTitle: 'glossary',
        icon: <Glossary />,
    },
];

export default routers;
