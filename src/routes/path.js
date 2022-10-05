import { Login, Home, SignUp, NotFound, FullBlog } from '../pages';
import { CreateBlog, CreateTopic, ManageBlog, SettingUser, UpdateBlog } from '../pages/manage';
import { AuthLayout, MainLayout, ManageLayout } from '../components/Layout';
import ChooseUpdate from '../pages/manage/ChooseUpdate';

//Public Routes
const publicPath = [
  { path: '/', component: Home, layout: MainLayout },
  { path: '/dang-nhap', component: Login, layout: AuthLayout },
  { path: '/dang-ky', component: SignUp, layout: AuthLayout },
  { path: '/quan-ly', component: CreateBlog, layout: ManageLayout },
  { path: '/quan-ly/tao-bai-viet', component: CreateBlog, layout: ManageLayout },
  { path: '/quan-ly/cai-dat', component: SettingUser, layout: ManageLayout },
  { path: '/quan-ly/bai-viet-da-thich', component: CreateBlog, layout: ManageLayout },
  { path: '/quan-ly/chu-de-theo-doi', component: CreateBlog, layout: ManageLayout },
  { path: '/quan-ly/tac-gia-dang-theo-doi', component: CreateBlog, layout: ManageLayout },
  { path: '/quan-ly/them-chu-de', component: CreateTopic, layout: ManageLayout },
  { path: '/quan-ly/quan-ly-noi-dung', component: ManageBlog, layout: ManageLayout },
  { path: '/quan-ly/chinh-sua-bai-viet', component: ChooseUpdate, layout: ManageLayout },
  { path: '/quan-ly/chinh-sua-bai-viet/:blogID', component: UpdateBlog, layout: ManageLayout },
  { path: '/vn/:slug', component: FullBlog, layout: MainLayout },
  { path: '/*', component: NotFound },
];
const privatePath = [];

export { publicPath, privatePath };
