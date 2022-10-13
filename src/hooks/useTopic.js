import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase-app/firebase-config';

const useTopic = (topicName) => {
  const [topic, setTopic] = useState();
  useEffect(() => {
    if (!topicName) return;
    const fetchData = async () => {
      const topicRef = collection(db, 'topic');
      const topicQuery = query(topicRef, where('name', '==', topicName));
      const topicSnapshot = await getDocs(topicQuery);
      topicSnapshot.forEach((doc) => {
        setTopic({
          topicID: doc.id,
          ...doc.data(),
        });
      });
    };
    fetchData();
  }, [topicName]);

  return [topic, setTopic];
};

export default useTopic;
