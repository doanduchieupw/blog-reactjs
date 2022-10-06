import BorderButton from '../Button/BorderButton';
import { PostWithImgBg, TitleSection } from '../NewsModule';
import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase-app/firebase-config';

const random = (number) => Math.floor(Math.random() * number);

const ExploreBlog = () => {
  const [exploreBlog, setExploreBlog] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRef = collection(db, 'blogs');
        const blogQuery = query(blogRef);
        const blogSnapshot = await getDocs(blogQuery);
        const blogResult = [];
        blogSnapshot.forEach((doc) => {
          blogResult.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        const length = blogResult.length;
        const newExploreBlog = () => {
          const first = random(length);
          let second = random(length);
          while (first === second) {
            second = random(length);
          }

          return [blogResult[first], blogResult[second]];
        };

        setExploreBlog(newExploreBlog());
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='mt-20 md:mt-14'>
      {exploreBlog && (
        <div>
          <TitleSection firstWord='Khám' secondWord='phá' />
          <div className='flex items-center justify-between '>
            <p className='my-4 max-w-xl text-sm leading-[1.7] text-[#555]'>
              Trả lời ngắn gọn các câu hỏi quan trọng nhất xung quanh một sự kiện: Ai? Làm gì? Khi nào? Ở đâu? Bao
              nhiêu? Như thế nào? Tại sao?
            </p>
            <BorderButton
              title='Xem tất cả'
              className='px-4 py-2 border border-gray-border rounded-full hidden md:block'
            />
          </div>
          <div className='flex flex-wrap gap-x-2 xs:mb-6'>
            {exploreBlog.map((item, index) => (
              <PostWithImgBg topic={item.topic} title={item.titleBlog} image={item.imageBlog} slug={item.slugBlog} />
            ))}
          </div>
          <div className='w-full flex justify-center md:hidden'>
            <BorderButton title='Xem tất cả' className='w-fit px-4 py-2 border border-gray-border rounded-full ' />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreBlog;
