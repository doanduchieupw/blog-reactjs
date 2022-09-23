import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faMagnifyingGlass,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { DropdownButton } from '../Button';
import SubHeader from './SubHeader';
import { useAuth } from '../../contexts/auth-context';
import { auth } from '../../firebase-app/firebase-config';
import { signOut } from 'firebase/auth';
import { Tooltip } from 'antd';
import HeaderTooltip from './HeaderTooltip';
const navList = [
  {
    title: 'Dành cho bạn',
    type: 'normal',
  },
  {
    title: 'Xu hướng',
    type: 'hot',
  },
  {
    title: 'Tạo bài viết',
    type: 'new',
  },
  {
    title: 'Khám phá',
    type: 'submenu',
    children: ['Đánh giá', 'Hướng dẫn', 'Giải trí', 'Podcasts'],
  },
];

const FullHeader = () => {
  const { userInfo } = useAuth();
  console.log(
    '🚀 ~ file: FullHeader.jsx ~ line 37 ~ FullHeader ~ userInfo',
    userInfo
  );
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  // handle display submenu when reponsive
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (size.width > 1024 && isOpenMenu) {
      setOpenMenu(false);
    }
  }, [size.width, isOpenMenu]);

  // // logout
  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="relative">
      <header
        className={`w-full fixed top-0 h-16 lg:h-14 bg-primary-bg z-40 shadow-md`}
      >
        {/* Container */}
        <div className="h-full lg:max-w-6xl lg:mx-auto lg:w-[90%] flex justify-between">
          {/* Left Header */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="w-16 lg:w-14 cursor-pointer hidden sm:block">
              <img src="/logo-blog-rm.png" alt="logo-header" />
            </div>
            <span className="ml-3 sm:ml-0 lg:hidden text-2xl text-white font-bold tracking-wider">
              TechEBlog.
            </span>
            {/* Navigation */}
            <div className="hidden lg:flex">
              {navList.map((item, index) =>
                item.type === 'submenu' ? (
                  <DropdownButton
                    key={index}
                    title={item.title}
                    submenu={item.children}
                    type="hover"
                  />
                ) : (
                  <button
                    key={index}
                    className="p-3.5 text-white text-sm font-semibold uppercase hover:bg-gray-bg hover:text-gray-font duration-300"
                  >
                    {item.title}
                    {item.type === 'hot' ? (
                      <span className="px-2.5 py-0.5 ml-3 bg-orange-bg-btn rounded-full ">
                        HOT
                      </span>
                    ) : (
                      <></>
                    )}
                  </button>
                )
              )}
            </div>
          </div>
          {/* Right Header */}
          <div className="flex items-center gap-x-3">
            <Link
              to="/trang-tim-kiem"
              className="flex item-center justify-center w-10 h-10 rounded-full text-xl text-white hover:bg-white hover:text-gray-font duration-300"
            >
              <span className="my-auto">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
            </Link>

            {userInfo ? (
              <div className="flex text-white gap-x-1">
                <Tooltip placement="bottomRight" color="white" mouseLeaveDelay={0.3} title={<HeaderTooltip /> }>
                  <div className="w-10 h-10">
                    <img
                      src={userInfo.photoURL}
                      alt={userInfo.displayName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </Tooltip>
              </div>
            ) : (
              <button className="uppercase p-2.5 lg:px-3 lg:py-1.5 bg-white rounded-full text-sm font-semibold">
                <Link to="/dang-nhap" className="hidden lg:block">
                  Đăng nhập
                </Link>
                <FontAwesomeIcon
                  icon={faUser}
                  className="block lg:hidden w-5 h-5"
                />
              </button>
            )}

            <button
              className="lg:hidden mr-3 p-2 rounded-full hover:bg-white text-white hover:text-gray-font duration-200"
              onClick={() => {
                setOpenMenu(true);
              }}
            >
              <FontAwesomeIcon icon={faBars} className="block w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Header*/}
      <SubHeader
        isMobile={isOpenMenu}
        onClick={() => {
          setOpenMenu(false);
        }}
      />
    </div>
  );
};

export default FullHeader;
