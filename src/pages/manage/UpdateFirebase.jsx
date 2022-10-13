import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../../firebase-app/firebase-config';
import { client } from '../../utils/typesense-client';

function UpdateFirebase() {
  useEffect(() => {
    const fetchData = async () => {
      const blogRef = collection(db, 'podcasts');
      const querySnapshot = await getDocs(blogRef);
      let blogList = [];
      querySnapshot.forEach((doc) => {
        blogList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      const blogData = blogList.map((item) => ({
        id: item.id,
        desc: item.desc,
        image: item.image,
        keyword: item.keyword,
        slug: item.slug,
        title: item.title,
        topic: item.topic,
      }));
      blogData.map((item) => {
        client.collections('podcasts').documents().create(item);
      });
    };
    fetchData();
  }, []);
  return <div>UpdateFirebase</div>;
}

export default UpdateFirebase;
