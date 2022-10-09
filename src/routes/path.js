import { Login, Home, SignUp, NotFound, FullBlog, UserProfile, FullPodcast } from '../pages';
import {
  CreateBlog,
  CreateTopic,
  ManageBlog,
  SettingUser,
  UpdateBlog,
  ChooseUpdate,
  FollowingManage,
  LikeManage,
  TopicManage,
  BookmarkManage,
  CreateMedia,
} from '../pages/manage';
import { AuthLayout, MainLayout, ManageLayout } from '../components/Layout';

//Public Routes
const publicPath = [
  { path: '/', component: Home, layout: MainLayout },
  { path: '/dang-nhap', component: Login, layout: AuthLayout },
  { path: '/dang-ky', component: SignUp, layout: AuthLayout },
  { path: '/thong-tin-tai-khoan/:userID', component: UserProfile, layout: MainLayout },
  { path: '/quan-ly', component: CreateBlog, layout: ManageLayout },
  { path: '/quan-ly/tao-bai-viet', component: CreateBlog, layout: ManageLayout },
  { path: '/quan-ly/tao-podcast', component: CreateMedia, layout: ManageLayout },
  { path: '/quan-ly/cai-dat', component: SettingUser, layout: ManageLayout },
  { path: '/quan-ly/bai-viet-da-luu', component: BookmarkManage, layout: ManageLayout },
  { path: '/quan-ly/bai-viet-da-thich', component: LikeManage, layout: ManageLayout },
  { path: '/quan-ly/chu-de-theo-doi', component: TopicManage, layout: ManageLayout },
  { path: '/quan-ly/tac-gia-dang-theo-doi', component: FollowingManage, layout: ManageLayout },
  { path: '/quan-ly/them-chu-de', component: CreateTopic, layout: ManageLayout },
  { path: '/quan-ly/quan-ly-noi-dung', component: ManageBlog, layout: ManageLayout },
  { path: '/quan-ly/chinh-sua-bai-viet', component: ChooseUpdate, layout: ManageLayout },
  { path: '/quan-ly/chinh-sua-bai-viet/:blogID', component: UpdateBlog, layout: ManageLayout },
  { path: '/vn/:slug', component: FullBlog, layout: MainLayout },
  { path: '/podcast/:slug', component: FullPodcast, layout: MainLayout },
  { path: '/*', component: NotFound },
];
const privatePath = [];

export { publicPath, privatePath };
