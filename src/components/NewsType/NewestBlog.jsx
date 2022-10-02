import { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase-app/firebase-config';
import { fromNow } from '../../utils/time';
import { TitleSection, PostWithImgBg, PostFullElement } from '../NewsModule';

const NewestBlog = () => {
  const [newestBlog, setNewestBlog] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRef = collection(db, 'blogs');
        const blogQuery = query(blogRef, orderBy('createdAt', 'desc'), limit(6));
        const blogSnapshot = await getDocs(blogQuery);
        const blogResult = [];
        blogSnapshot.forEach((doc) => {
          blogResult.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setNewestBlog(blogResult);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {newestBlog && (
        <div className='mt-8 md:mt-10'>
          <TitleSection firstWord='Mới' secondWord='nhất' />
          <div className='flex flex-wrap gap-x-2 xs:mb-6'>
            {newestBlog.map((item, index) => {
              if (index >= 2) return;
              return (
                <PostWithImgBg topic={item.topic} title={item.titleBlog} image={item.imageBlog} slug={item.slugBlog} />
              );
            })}
          </div>

          <div className='flex flex-wrap md:-mx-4'>
            {newestBlog.map((item, index) => {
              if (index < 2) return;
              return (
                <PostFullElement
                  topic={item.topic}
                  title={item.titleBlog}
                  image={item.imageBlog}
                  authorName={item.user.displayName}
                  createdAt={fromNow(item.createdAt.seconds)}
                  avatar={item.user.photoAvatar}
                  slug={item.slugBlog}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewestBlog;
