import { Login, Home, SignUp, NotFound } from '../pages';
import { CreateBlog, CreateTopic, SettingUser } from '../pages/manage';
import { AuthLayout, MainLayout, ManageLayout } from '../components/Layout';

//Public Routes
const publicPath = [
  { path: '/', component: Home, layout: MainLayout },
  { path: '/*', component: NotFound },
  { path: '/dang-nhap', component: Login, layout: AuthLayout },
  { path: '/dang-ky', component: SignUp, layout: AuthLayout },
  { path: '/quan-ly', component: CreateBlog, layout: ManageLayout },
  { path: '/quan-ly/tao-bai-viet', component: CreateBlog, layout: ManageLayout },
  { path: '/quan-ly/cai-dat', component: SettingUser, layout: ManageLayout },
  { path: '/quan-ly/bai-viet-da-thich', component: CreateBlog, layout: ManageLayout },
  { path: '/quan-ly/chu-de-theo-doi', component: CreateBlog, layout: ManageLayout },
  { path: '/quan-ly/tac-gia-dang-theo-doi', component: CreateBlog, layout: ManageLayout },
  { path: '/quan-ly/them-chu-de', component: CreateTopic, layout: ManageLayout },
];
const privatePath = [];

export { publicPath, privatePath };
