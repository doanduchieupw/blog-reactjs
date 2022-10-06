import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-app/firebase-config';
import { getUserInfo } from '../../hooks';

function LikeManage() {
  const [user, setUser] = getUserInfo();
  const [likeBlog, setLikeBlog] = useState();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const blogRef = collection(db, 'blogs');
        const blogQuery = query(blogRef, where('like.user', 'array-contains', user.userID));
        const blogSnapshot = await getDocs(blogQuery);
        const blogResult = [];
        blogSnapshot.forEach((doc) => {
          blogResult.push({
            blogID: doc.id,
            ...doc.data(),
          });
        });
        console.log('🚀 ~ file: LikeManage.jsx ~ line 23 ~ blogSnapshot.forEach ~ blogResult', blogResult);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user]);
  return <div>LikeManage</div>;
}

export default LikeManage;
