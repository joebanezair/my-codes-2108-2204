import Mobile from '../Mobile';
import Share from '../Share';
import Tutorial from '../Tutorial';

const routers = [
    {
        path: '/',
        component: Mobile,
        exact: true,
    },
    {
        path: '/share',
        component: Share,
    },
    {
        path: '/tutorial',
        component: Tutorial,
    },
];

export default routers;
