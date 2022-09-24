import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../firebase-app/firebase-config';

const ManageBlog = () => {
  useEffect(() => {
    const fetchData = async () => {
      const blogRef = collection(db, 'blogs');
      const querySnapshot = await getDocs(blogRef);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    };
    fetchData();
  }, []);
  return <>ManageBlog</>;
};

export default ManageBlog;
