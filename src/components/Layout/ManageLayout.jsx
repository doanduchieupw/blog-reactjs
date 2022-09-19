import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import { FullHeader } from '../Header';
const manageList = [
  { name: 'Thêm bài viết', slug: 'them-bai-viet' },
  { name: 'Cài đặt', slug: 'cai-dat' },
  { name: 'Bài viết đã thích', slug: 'bai-viet-da-thich' },
  { name: 'Chủ đề theo dõi', slug: 'chu-de-theo-doi' },
  { name: 'Tác giả đang theo dõi', slug: 'tac-gia-dang-theo-doi' },
];
const ManageLayout = ({ children }) => {
  const [manageActive, setManageActive] = useState(0);
  
  return (
    <div className="h-screen overflow-scroll">
      <FullHeader />
      <div className="flex w-[90%] max-w-6xl mx-auto pt-28">
        <div className="w-1/4 flex flex-col items-start">
          {manageList.map((item, index) => (
            <Link
              key={index}
              to={`/quan-ly/${item.slug}`}
              className={`relative w-full px-8 py-4 text-lighter-gray-font text-[13px] font-semibold ${
                manageActive === index
                  ? 'text-primary-bg bg-gray-bg hover:text-primary-bg animate-switchDown before:content-[""] before:absolute before:left-0 before:top-0 before:h-full before:block before:w-0.5 before:bg-primary-bg'
                  : ''
              }`}
              onClick={() => setManageActive(index)}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="w-3/4">{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default ManageLayout;
