import React, { useEffect, useState } from 'react';
import { db } from '../firebase-app/firebase-config';
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { NormalButton } from '../components/Button';
import { BlogCard } from '../components/BlogModule';
import { fromNow } from '../utils/time';
import { useAuth } from '../contexts/auth-context';
import { notification } from 'antd';

function UserProfile({ layoutRef }) {
  const { userInfo } = useAuth();
  const { userID } = useParams();
  const [user, setUser] = useState();
  const [userBlogs, setUserBlogs] = useState();
  const [isFollow, setFollow] = useState({
    state: false,
    title: 'Theo dõi',
  });
  const navigate = useNavigate();
  useEffect(() => {
    layoutRef.current.scroll({
      top: 0,
      scroll: 'smooth',
    });
  }, []);
  const handleFollow = async () => {
    if (!userInfo) {
      notification['warning']({
        message: 'Cảnh báo',
        description: 'Vui lòng đăng nhập',
      });
      return;
    }
    try {
      const userRef = doc(db, 'users', userID);
      await updateDoc(userRef, {
        folower: isFollow.state ? arrayRemove(userInfo.uid) : arrayUnion(userInfo.uid),
      });
      const accountRef = doc(db, 'users', userInfo.uid);
      await updateDoc(accountRef, {
        folowing: isFollow.state ? arrayRemove(userID) : arrayUnion(userID),
      });

      setFollow({ state: !isFollow.state, title: isFollow.state ? 'Theo dõi' : 'Đang theo dõi' });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userInfo?.uid === userID) navigate('/quan-ly/cai-dat');
    const fetchData = async () => {
      try {
        const userRef = doc(db, 'users', userID);
        const userSnapshot = await getDoc(userRef);
        setUser({
          userID: userSnapshot.id,
          ...userSnapshot.data(),
        });
        if (userSnapshot.data().folower.includes(userInfo.uid)) {
          setFollow({ state: true, title: 'Đang theo dõi' });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userInfo]);
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const blogRef = collection(db, 'blogs');
        const blogQuery = query(blogRef, where('user.id', '==', user.userID));
        const blogSnapshot = await getDocs(blogQuery);
        const blogResult = [];
        blogSnapshot.forEach((doc) => {
          blogResult.push({
            blogID: doc.id,
            ...doc.data(),
            createdAt: fromNow(doc.data().createdAt.seconds) + ' trước',
          });
        });
        setUserBlogs(blogResult);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user]);
  return (
    <div className='pt-16 min-h-[75vh]'>
      {user && (
        <div className='max-w-xl w-[80%] mx-auto mt-4'>
          {/* User info */}
          <div className='flex items-center gap-x-4'>
            <img
              src={user.photoAvatar}
              alt={user.fullname}
              className='w-20 h-20 block border border-lightest-gray rounded-full object-cover'
            />
            <div className='flex flex-col items-start gap-y-3'>
              <h1 className='text-2xl font-semibold text-primary-bg leading-snug'>{user.fullname}</h1>
              <NormalButton title={isFollow.title} onClick={() => handleFollow()} primary={isFollow.state} />
            </div>
          </div>
          {/* Blogs of user */}
          <div className='mt-12 mb-24'>
            <h1 className='pb-3 text-base text-primary-bg font-semibold uppercase border-b border-lighter-gray-font'>
              Tất cả bài viết
            </h1>
            <div className='flex flex-col'>
              {userBlogs &&
                userBlogs.map((item, index) => (
                  <BlogCard
                    key={index}
                    image={item.imageBlog}
                    title={item.titleBlog}
                    topic={item.topic}
                    createdAt={item.createdAt}
                    desc={item.excerptBlog}
                    slug={item.slugBlog}
                  />
                ))}
              {JSON.stringify(userBlogs) === JSON.stringify([]) && (
                <div className='mt-6 text-gray-submenu-font'>Không có dữ liệu hiển thị...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
