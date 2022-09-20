import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { FullHeader } from '../Header';
const manageList = [
  { name: 'Tạo bài viết', slug: 'tao-bai-viet' },
  { name: 'Cài đặt', slug: 'cai-dat' },
  { name: 'Bài viết đã thích', slug: 'bai-viet-da-thich' },
  { name: 'Chủ đề theo dõi', slug: 'chu-de-theo-doi' },
  { name: 'Tác giả đang theo dõi', slug: 'tac-gia-dang-theo-doi' },
];
const ManageLayout = ({ children }) => {
  const [manageActive, setManageActive] = useState(0);
  const manageItemRef = useRef();
  const indicatorRef = useRef();
  useEffect(() => {
    const manageItemHeight = manageItemRef.current.clientHeight;
    indicatorRef.current.style.height = `${manageItemHeight}px`;
    indicatorRef.current.style.top = `${manageActive * manageItemHeight}px`;
  }, [manageActive]);
  return (
    <div className='h-screen overflow-scroll'>
      <FullHeader />
      <div className='flex w-[90%] max-w-6xl mx-auto pt-28 pb-14 '>
        <div className='relative w-1/4 pr-8 flex flex-col items-start'>
          <div
            ref={indicatorRef}
            className='absolute -z-10 left-0 w-[calc(100%-32px)] bg-gray-bg before:content-[""] before:left-0 before:h-full before:block before:w-0.5 before:bg-primary-bg duration-300'
          ></div>
          {manageList.map((item, index) => (
            <Link
              key={index}
              ref={manageItemRef}
              to={`/quan-ly/${item.slug}`}
              className={`w-full px-8 py-4 text-lighter-gray-font text-sm font-semibold ${
                manageActive === index ? 'text-primary-bg hover:text-primary-bg' : ''
              }`}
              onClick={() => setManageActive(index)}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className='w-3/4'>{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default ManageLayout;
