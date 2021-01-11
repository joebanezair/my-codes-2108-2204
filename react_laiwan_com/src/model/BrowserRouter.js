import App from '../App';
import Support from '../Support';
import Tutorial from '../Tutorial';

const routers = [
    {
        path: '/',
        component: App,
        exact: true,
    },
    {
        path: '/support',
        component: Support,
    },
    {
        path: '/tutorial',
        component: Tutorial,
    },
];

export default routers;
