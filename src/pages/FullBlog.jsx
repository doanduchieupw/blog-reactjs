import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase-app/firebase-config';
import { fromUnixTime, formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { BlogHeader } from '../components/Header';
import { BlogContent } from '../components/BlogModule';

const FullBlog = ({ layoutRef }) => {
  const { slug } = useParams();
  const [blog, setBlog] = useState();
  const [showBlogHeader, setShowBlogHeader] = useState({ state: false, position: 0 });
  const navigate = useNavigate();
  // const positionScroll = useReading();
  useEffect(() => {
    const handleScroll = (event) => {
      if (layoutRef.current.scrollTop > 500) {
        setShowBlogHeader({
          state: true,
          position: Math.floor((layoutRef.current.scrollTop / (layoutRef.current.scrollHeight - 600)) * 100),
        });
      } else {
        setShowBlogHeader({
          state: false,
          position: Math.floor((layoutRef.current.scrollTop / (layoutRef.current.scrollHeight - 600)) * 100),
        });
      }
    };

    layoutRef.current.addEventListener('scroll', handleScroll);

    return () => {
      layoutRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRef = collection(db, 'blogs');
        const blogQuery = query(blogRef, where('slugBlog', '==', slug));
        const blogSnapshot = await getDocs(blogQuery);
        if (blogSnapshot.empty) {
          navigate('/khong-ton-tai');
          return;
        }
        blogSnapshot.forEach((doc) => {
          setBlog({
            blogID: doc.id,
            ...doc.data(),
            createdAtFormat: formatDistanceToNow(fromUnixTime(doc.data().createdAt.seconds), { locale: vi }),
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {blog && (
        <div className='relative min-h-full pt-14'>
          {showBlogHeader.state && <BlogHeader title={blog.titleBlog} process={showBlogHeader.position} />}
          <div className='max-w-6xl'>
            <div className=''>
              {/* First part of blog */}
              <div className=' w-[90%] max-w-6xl mx-auto '>
                <div className='mt-6'>
                  {/* Time */}
                  <span className='text-xs text-lighter-gray-font'>{`${blog?.createdAtFormat.replace(
                    'khoảng',
                    ''
                  )} trước.`}</span>
                  {/* Title */}
                  <h1 className='text-[26px] leading-[34px] font-bold text-primary-bg tracking-normal my-4'>
                    {blog.titleBlog}
                  </h1>
                  <div className='mb-4 text-sm leading-6 text-lighter-gray-font font-merriweather '>
                    {blog.excerptBlog}
                  </div>
                  {/* Author */}
                  <div className='flex gap-x-2 items-center'>
                    <Link to={`/${blog.user.id}`} className='w-10 h-10 bg-transparent cursor-pointer'>
                      <img
                        src={blog.user.photoAvatar}
                        alt={blog.user.displayName}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                    </Link>
                    <div className='flex flex-col max-w-xl justify-center tracking-wider'>
                      <span className='line-clamp-1 uppercase text-xs'>Tác giả</span>
                      <Link
                        to={`/${blog.user.id}`}
                        className='text-sm font-semibold text-light-green-font cursor-pointer line-clamp-1'
                      >
                        {blog.user.displayName}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Second part of blog */}
              <div className='my-8 mx-auto'>
                <img src={blog.imageBlog} alt={blog.titleBlog} className='w-full h-auto' />
                <p className='mt-2 mb-8 px-4 font-merriweather font-light text-sm leading-[22px] text-light-gray-font'>
                  {blog.captionImageBlog}
                </p>
              </div>
              {/* Content of blog */}
              <BlogContent content={blog.contentBlog} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullBlog;
