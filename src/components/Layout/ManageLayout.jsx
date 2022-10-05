import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { db } from '../../firebase-app/firebase-config';
import { userRole } from '../../utils/constants';
import Footer from '../Footer';
import { FullHeader } from '../Header';
const manageList = [
  { name: 'Tạo bài viết', slug: 'tao-bai-viet' },
  { name: 'Cài đặt', slug: 'cai-dat' },
  { name: 'Bài viết đã thích', slug: 'bai-viet-da-thich' },
  { name: 'Chủ đề theo dõi', slug: 'chu-de-theo-doi' },
  { name: 'Tác giả đang theo dõi', slug: 'tac-gia-dang-theo-doi' },
  { name: 'Cập nhật bài viết', slug: 'chinh-sua-bai-viet' },
  { name: 'Chủ đề', slug: 'them-chu-de', private: true },
  { name: 'Quản lý nội dung', slug: 'quan-ly-noi-dung', private: true },
];
const ManageLayout = ({ children }) => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [manageActive, setManageActive] = useState(0);
  const [user, setUser] = useState();
  const manageItemRef = useRef();
  const indicatorRef = useRef();
  const locationCurrent = useLocation();
  // render indicator in first time
  useEffect(() => {
    const checkPath = manageList.map((item, index) => {
      return item.slug;
    });
    const indexOfCurrentPath = checkPath.indexOf(locationCurrent.pathname.split('/')[2]);
    setManageActive(indexOfCurrentPath);
  }, []);

  // check user login
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = doc(db, 'users', userInfo.uid);
        const userSnapshot = await getDoc(userRef);
        setUser({
          id: userSnapshot.id,
          ...userSnapshot.data(),
        });
      } catch (err) {
        console.log(err);
      }
    };
    if (!userInfo) {
      navigate('/dang-nhap');
      return;
    } else {
      fetchData();
    }
  }, [userInfo]);

  // dynamic indicator
  useEffect(() => {
    if (!user) return;
    const manageItemHeight = manageItemRef.current.clientHeight;
    indicatorRef.current.style.height = `${manageItemHeight}px`;
    indicatorRef.current.style.top = `${manageActive * manageItemHeight}px`;
  }, [manageActive, user]);
  return (
    <div className='h-screen overflow-y-scroll'>
      <FullHeader />
      <div className='flex w-[90%] max-w-6xl mx-auto pt-28 pb-14 '>
        <div className='relative w-1/4 pr-8 flex flex-col items-start'>
          <div
            ref={indicatorRef}
            className='absolute -z-10 left-0 w-[calc(100%-32px)] bg-gray-bg before:content-[""] before:left-0 before:h-full before:block before:w-0.5 before:bg-primary-bg duration-300'
          ></div>
          {user &&
            manageList.map((item, index) => {
              if (user.role == userRole.ADMIN) {
                return (
                  <Link
                    key={index}
                    ref={manageItemRef}
                    to={`/quan-ly/${item.slug}`}
                    className={`w-full px-8 py-4 text-lighter-gray-font text-sm font-semibold  ${
                      manageActive === index ? 'text-primary-bg hover:text-primary-bg' : ''
                    }`}
                    onClick={() => setManageActive(index)}
                  >
                    <span className='line-clamp-1'>{item.name}</span>
                  </Link>
                );
              } else {
                return (
                  !item.private && (
                    <Link
                      key={index}
                      ref={manageItemRef}
                      to={`/quan-ly/${item.slug}`}
                      className={`w-full px-8 py-4 text-lighter-gray-font text-sm font-semibold  ${
                        manageActive === index ? 'text-primary-bg hover:text-primary-bg' : ''
                      }`}
                      onClick={() => setManageActive(index)}
                    >
                      <span className='line-clamp-1'>{item.name}</span>
                    </Link>
                  )
                );
              }
            })}
        </div>
        <div className='w-3/4'>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default ManageLayout;
