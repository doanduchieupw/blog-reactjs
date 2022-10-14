import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/auth-context';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-app/firebase-config';

const getUserInfo = () => {
  const { userInfo } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    if (!userInfo) return;
    const fetchData = async () => {
      try {
        const userRef = doc(db, 'users', userInfo.uid);
        const userSnapshot = await getDoc(userRef);
        setUser({
          userID: userSnapshot.id,
          ...userSnapshot.data(),
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userInfo]);
  return [user, setUser];
};

export default getUserInfo;
