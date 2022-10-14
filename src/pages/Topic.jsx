import { useEffect, useState } from 'react';
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

import { NormalButton } from '../components/Button';
import { db } from '../firebase-app/firebase-config';
import { getTime } from '../utils/time';
import { getUserInfo } from '../hooks';
import { notification } from 'antd';

const Topic = () => {
  const [user, setUser] = getUserInfo();
  const [topic, setTopic] = useState();
  const [blog, setBlog] = useState();
  const { slug } = useParams();
  const [isSubTopic, setSubTopic] = useState(false);
  useEffect(() => {
    if (!topic) return;
    document.title = `TechEBlog | ${topic.name}`;
  }, [topic]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicRef = collection(db, 'topic');
        const topicQuery = query(topicRef, where('slug', '==', slug));
        const topicSnapshot = await getDocs(topicQuery);
        const topicResult = [];
        topicSnapshot.forEach((doc) => {
          topicResult.push({
            topicID: doc.id,
            ...doc.data(),
          });
        });
        setTopic(topicResult[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (!topic) return;
    const fetchData = async () => {
      try {
        const blogRef = collection(db, 'blogs');
        const blogQuery = query(blogRef, where('topic', '==', topic.name));
        const blogSnapshot = await getDocs(blogQuery);
        const blogResult = [];
        blogSnapshot.forEach((doc) => {
          blogResult.push({
            blogID: doc.id,
            ...doc.data(),
            createdAt: getTime(doc.data().createdAt.seconds, 'dd LLL'),
          });
        });
        setBlog(blogResult);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [topic]);
  useEffect(() => {
    if (!user || !topic) return;
    setSubTopic(user.topic.includes(topic.name));
  }, [user]);

  const handleSubTopic = () => {
    if (!user) {
      notification['warning']({
        message: 'Cảnh báo',
        description: 'Vui lòng đăng nhập để theo dõi chủ đề mong muốn',
      });
      return;
    }
    const updateData = async () => {
      const userRef = doc(db, 'users', user.userID);
      await updateDoc(userRef, {
        topic: user.topic.includes(topic.name) ? arrayRemove(topic.name) : arrayUnion(topic.name),
      });
      setSubTopic(!isSubTopic);
    };
    updateData();
  };
  return (
    <div className='pt-16 w-[calc(100%-32px)] mx-auto mt-4 mb-12 max-w-6xl'>
      {topic && blog && (
        <div className='flex items-start justify-start flex-wrap'>
          <div className='max-w-full lg:max-w-3xl lg:pr-4 w-full order-2 lg:order-1'>
            {/* First article */}
            <div className='relative w-screen left-[calc(-50vw+50%)] xs:w-full xs:static mb-4'>
              <div className='mb-3'>
                <img src={blog[0].imageBlog} className='object-cover xs:rounded-md' />
              </div>
              <div className='mx-4 pb-4 border-b md:border-0'>
                <h3 className='text-xl font-semibold mb-2'>{blog[0].titleBlog}</h3>
                <p className='text-sm line-clamp-2 mb-3'>{blog[0].excerptBlog}</p>
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col items-start text-xs'>
                    <span className='text-gray-submenu-font font-semibold'>{blog[0].user.displayName}</span>
                    <span className='text-light-gray-font'>{blog[0].createdAt}</span>
                  </div>
                  <div className='px-1'>
                    <FontAwesomeIcon icon={faBookmark} className='w-[16.5px] h-[19px] block' />
                  </div>
                </div>
              </div>
            </div>
            {/* ... article */}
            <div className='flex items-start flex-wrap md:justify-between '>
              {blog.map((item, index) => {
                if (index === 0) return;
                return (
                  <div
                    key={index}
                    className='mb-4 pb-4 border-b md:border-0 w-full md:max-w-[calc(50%-16px)] flex items-center justify-start '
                  >
                    <div className='max-w-[calc(36%-8px)]  mr-2'>
                      <img src={item.imageBlog} className='rounded-md' />
                    </div>
                    <div className='max-w-[calc(64%-12px)] ml-3'>
                      <p className='text-xs text-blue-font font-semibold'>{item.topic}</p>
                      <h3 className='text-base text-primary-bg font-semibold line-clamp-2'>{item.titleBlog}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Nav */}
          <div className='max-w-full w-full lg:max-w-[calc(100%-800px)] lg:pl-4 order-1 lg:order-2'>
            <div className='mb-[28px]'>
              <h3 className='uppercase text-2xl font-semibold mb-2 pl-4 border-l-4 border-l-green-border'>
                {topic.name}
              </h3>
              <p className='text-sm text-primary-bg mb-3'>{topic.desc}</p>
              <NormalButton title={`${isSubTopic ? 'Bỏ theo dõi' : 'Theo dõi'}`} onClick={handleSubTopic} />
            </div>
            <div className='mb-14'>
              <h3 className='text-base font-semibold uppercase mb-4'>Chủ đề liên quan</h3>
              <div className='flex flex-wrap gap-3'>
                {topic?.relative?.map((item, index) => (
                  <span>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topic;
