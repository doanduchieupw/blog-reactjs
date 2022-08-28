import { Login, Home, SignUp } from '../pages';
import { AuthLayout, MainLayout } from '../components/Layout';


//Public Routes
const publicPath = [
    { path: '/', component: Home, layout: MainLayout},
    { path: '/login', component: Login, layout: AuthLayout},
    { path: '/signup', component: SignUp, layout: AuthLayout},
];
const privatePath = [];

export { publicPath, privatePath };