import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase-app/firebase-config';
import { fromUnixTime, formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { BlogHeader } from '../components/Header';

const FullBlog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState();

  console.log('🚀 ~ file: FullBlog.jsx ~ line 10 ~ FullBlog ~ blog', blog);
  useEffect(() => {
    const fetchData = async () => {
      const blogRef = collection(db, 'blogs');
      const blogQuery = query(blogRef, where('slugBlog', '==', slug));
      const blogSnapshot = await getDocs(blogQuery);
      // console.log(moment.locale('vi'));
      blogSnapshot.forEach((doc) => {
        setBlog({
          blogID: doc.id,
          ...doc.data(),
          createdAtFormat: formatDistanceToNow(fromUnixTime(doc.data().createdAt.seconds), { locale: vi }),
        });
      });
    };
    fetchData();
  }, []);
  return (
    <div className='relative min-h-full'>
      <BlogHeader title={blog.titleBlog} />
      <div className=' w-[90%] max-w-6xl mx-auto pt-16 '>
        {blog && (
          <div className='max-w-xl'>
            <div>
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
                {/* Author */}
                <div className='flex gap-x-1 items-center'>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default FullBlog;
