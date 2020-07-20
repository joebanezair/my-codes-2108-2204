import App from '../App';
import Support from '../Support';


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
];

export default routers;
