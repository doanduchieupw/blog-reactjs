import { Login, Home, SignUp, NotFound } from '../pages';
import { NewBlog } from '../pages/manage'
import { AuthLayout, MainLayout, ManageLayout } from '../components/Layout';


//Public Routes
const publicPath = [
    { path: '/', component: Home, layout: MainLayout},
    { path: '/*', component: NotFound},
    { path: '/dang-nhap', component: Login, layout: AuthLayout},
    { path: '/dang-ky', component: SignUp, layout: AuthLayout},
    { path: '/quan-ly', component: NewBlog, layout: ManageLayout},
    { path: '/quan-ly/them-bai-viet', component: NewBlog, layout: ManageLayout},
    { path: '/quan-ly/cai-dat', component: NewBlog, layout: ManageLayout},
    { path: '/quan-ly/bai-viet-da-thich', component: NewBlog, layout: ManageLayout},
    { path: '/quan-ly/chu-de-theo-doi', component: NewBlog, layout: ManageLayout},
    { path: '/quan-ly/tac-gia-dang-theo-doi', component: NewBlog, layout: ManageLayout},
];
const privatePath = [];

export { publicPath, privatePath };