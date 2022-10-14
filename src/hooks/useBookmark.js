import { notification } from 'antd';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { db } from '../firebase-app/firebase-config';

const useBookmark = (blogID) => {
  const { userInfo } = useAuth();
  const [isBookMark, setIsBookMark] = useState(false);
  const handleBookmark = () => {
    if (!userInfo) {
      notification['warning']({
        message: 'Cảnh báo',
        description: 'Vui lòng đăng nhập',
      });
      return;
    }
    const postData = async () => {
      try {
        const blogRef = doc(db, 'blogs', blogID);
        await updateDoc(blogRef, {
          bookmark: isBookMark ? arrayRemove(userInfo.uid) : arrayUnion(userInfo.uid),
        });
      } catch (err) {
        console.log(err);
      }
    };
    setIsBookMark(!isBookMark);
    postData();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRef = doc(db, 'blogs', blogID);
        const blogSnapshot = await getDoc(blogRef);
        if (blogSnapshot.data().bookmark.includes(userInfo.uid)) {
          setIsBookMark(true);
        } else {
          setIsBookMark(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return [isBookMark, setIsBookMark, handleBookmark];
};

export default useBookmark;
