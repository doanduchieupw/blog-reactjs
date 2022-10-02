import { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase-app/firebase-config';
import { fromNow } from '../../utils/time';
import { PostWithTitle, TitleSection } from '../NewsModule';

const TrendingBlog = () => {
  const [trendingBlog, setTrendingBlog] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRef = collection(db, 'blogs');
        const blogQuery = query(blogRef, orderBy('like.count', 'desc'), limit(5));
        const blogSnapshot = await getDocs(blogQuery);
        const blogResult = [];
        blogSnapshot.forEach((doc) => {
          blogResult.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTrendingBlog(blogResult);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='mt-20 xs:mt-14 flex'>
      <div className='lg:w-1/2'>
        <TitleSection firstWord='Xu' secondWord='hướng' />
        {trendingBlog && (
          <div className='w-full'>
            {trendingBlog.map((item, index) => (
              <PostWithTitle index={index + 1} title={item.titleBlog} image={item.imageBlog} />
            ))}
          </div>
        )}
      </div>
      <div className='hidden w-1/2 lg:flex flex-col justify-start items-end '>
        <img src='https://img.vietcetera.com/uploads/images/05-sep-2022/thtl-skyscrapper.jpg' alt='' />
      </div>
    </div>
  );
};

export default TrendingBlog;
