import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';

import { DropdownButton } from '../Button';
import SubHeader from './SubHeader';
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
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isHidden, setHidden] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    console.log(isOpenMenu);
  }, [isOpenMenu]);

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

  return (
    <div className='relative'>
      <header className={`w-full fixed top-0 h-16 lg:h-14 bg-primary-bg z-40 shadow-md`}>
        {/* Container */}
        <div className='h-full lg:max-w-6xl lg:mx-auto lg:w-[90%] flex justify-between'>
          {/* Left Header */}
          <div className='flex items-center'>
            {/* Logo */}
            <div className='w-16 lg:w-14 cursor-pointer hidden sm:block'>
              <img src='/logo-blog-rm.png' alt='logo-header' />
            </div>
            <span className='ml-3 sm:ml-0 lg:hidden text-2xl text-white font-bold tracking-wider'>TechEBlog.</span>
            {/* Navigation */}
            <div className='hidden lg:flex'>
              {navList.map((item, index) =>
                item.type === 'submenu' ? (
                  <DropdownButton key={index} title={item.title} submenu={item.children} />
                ) : (
                  <button
                    key={index}
                    className='p-3.5 text-white text-sm font-semibold uppercase hover:bg-gray-bg hover:text-gray-font duration-300'
                  >
                    {item.title}
                    {item.type === 'hot' ? (
                      <span className='px-2.5 py-0.5 ml-3 bg-orange-bg-btn rounded-full '>HOT</span>
                    ) : (
                      <></>
                    )}
                  </button>
                )
              )}
            </div>
          </div>
          {/* Right Header */}
          <div className='flex items-center gap-x-3'>
            <Link
              to='/trang-tim-kiem'
              className='flex item-center justify-center w-10 h-10 rounded-full text-xl text-white hover:bg-white hover:text-gray-font duration-300'
            >
              <span className='my-auto'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
            </Link>

            <button className='uppercase p-2.5 lg:px-3 lg:py-1.5 bg-white rounded-full text-sm font-semibold'>
              <span className='hidden lg:block'>Đăng nhập</span>
              <FontAwesomeIcon icon={faUser} className='block lg:hidden w-5 h-5' />
            </button>

            <button
              className='lg:hidden mr-3 p-2 rounded-full hover:bg-white text-white hover:text-gray-font duration-200'
              onClick={() => {
                setOpenMenu(true);
                setHidden(false);
              }}
            >
              <FontAwesomeIcon icon={faBars} className='block w-6 h-6' />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Header*/}
      {/* <SubHeader
        isMobile={isOpenMenu}
        isHidden={isHidden}
        onClick={() => {
          setOpenMenu(false);
          setTimeout(() => setHidden(true), 100);
        }}
      /> */}
      <div
        className={`transition-all ease-in-out duration-500 fixed h-screen top-0 w-screen bg-red-400 z-50 ${
          isOpenMenu ? 'left-0' : 'left-full'
        }`}
      >
        <div className='sticky bg-green-400 h-40'>
          <button
            className=''
            onClick={() => {
              setOpenMenu(false);
              console.log('click', isOpenMenu);
            }}
          >
            X
          </button>
        </div>
        <div className='h-80 overflow-auto'>
          <div className='h-24'>i am 1</div>
          <div className='h-24'>i am 2</div>
          <div className='h-24'>i am 3</div>
          <div className='h-24'>i am 5</div>
          <div className='h-24'>i am 6</div>
          <div className='h-24'>i am 7</div>
        </div>
      </div>
    </div>
  );
};

export default FullHeader;
