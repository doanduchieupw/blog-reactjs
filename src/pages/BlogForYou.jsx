import { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase-app/firebase-config';
import { fromNow } from '../utils/time';
import { getUserInfo } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { PostFullElement, TitleSection } from '../components/NewsModule';

const BlogForYou = () => {
  const [user, setUser] = getUserInfo();
  const [blogForYou, setBlogForYou] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (user.topic.length === 0) {
        try {
          const blogRef = collection(db, 'blogs');
          const blogQuery = query(blogRef, orderBy('createdAt', 'desc'));
          const blogSnapshot = await getDocs(blogQuery);
          const blogResult = [];
          blogSnapshot.forEach((doc) => {
            blogResult.push({
              blogID: doc.id,
              ...doc.data(),
            });
          });
          setBlogForYou(blogResult);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const topicRef = collection(db, 'topic');
          const topicQuery = query(topicRef, where('name', 'in', user.topic));
          const topicSnapshot = await getDocs(topicQuery);
          const topicResult = [];
          topicSnapshot.forEach((doc) => {
            doc.data().relative
              ? topicResult.push(doc.data().name, ...doc.data().relative)
              : topicResult.push(doc.data().name);
          });
          console.log('🚀 ~ file: BlogForYou.jsx ~ line 37 ~ fetchData ~ topicResult', topicResult);

          const blogRef = collection(db, 'blogs');
          const blogQuery = query(blogRef, where('topic', 'in', topicResult), orderBy('createdAt', 'desc'));
          const blogSnapshot = await getDocs(blogQuery);
          const blogResult = [];
          blogSnapshot.forEach((doc) => {
            blogResult.push({
              blogID: doc.id,
              ...doc.data(),
            });
          });
          setBlogForYou(blogResult);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [user]);
  return (
    <div className='w-[90%] max-w-6xl mx-auto pt-16 mt-8 mb-12'>
      <TitleSection firstWord='Dành' secondWord='cho bạn' />
      <div className='flex flex-wrap'>
        {blogForYou &&
          blogForYou.map((item, index) => (
            <PostFullElement
              blogID={item.blogID}
              topic={item.topic}
              title={item.titleBlog}
              image={item.imageBlog}
              authorName={item.user.displayName}
              createdAt={fromNow(item.createdAt.seconds)}
              avatar={item.user.photoAvatar}
              slug={item.slugBlog}
              userID={item.user.id}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogForYou;
