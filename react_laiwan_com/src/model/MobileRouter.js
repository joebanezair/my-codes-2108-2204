import Mobile from '../Mobile';
import Share from '../Share';


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
];

export default routers;
