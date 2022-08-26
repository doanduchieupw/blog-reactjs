import { Login } from '../pages';
import { AuthLayout, MainLayout } from '../components/Layout';


//Public Routes
const publicPath = [
    { path: '/login', component: Login, layout: AuthLayout},
];
const privatePath = [];

export { publicPath, privatePath };