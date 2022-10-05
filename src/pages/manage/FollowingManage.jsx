import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { TitleManage, UserFollowCard } from '../../components/ManageModule';
import { useAuth } from '../../contexts/auth-context';
import { db } from '../../firebase-app/firebase-config';

function FollowingManage() {
  const { userInfo } = useAuth();
  const [user, setUser] = useState();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (!userInfo) return;
    const fetchData = async () => {
      const userRef = doc(db, 'users', userInfo.uid);
      const userSnapshot = await getDoc(userRef);
      setUser({
        userID: userSnapshot.id,
        ...userSnapshot.data(),
      });
    };
    fetchData();
  }, [userInfo]);
  useEffect(() => {
    if (!user) return;
    let ids = [...user.folowing];
    const newFollowingList = [];
    const fetchData = async (ids) => {
      try {
        for (let id of ids) {
          console.log('🚀 ~ file: FollowingManage.jsx ~ line 30 ~ fetchData ~ id', id);
          const userRef = doc(db, 'users', id);
          const userSnapshot = await getDoc(userRef);
          newFollowingList.push({ userID: userSnapshot.id, ...userSnapshot.data() });
        }
        setFollowing(newFollowingList);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData(ids);
  }, [user]);
  return (
    <div>
      <TitleManage title='Tác giả đang theo dõi' />
      {following && following.map((item, index) => <UserFollowCard image={item.photoAvatar} name={item.fullname} />)}
    </div>
  );
}

export default FollowingManage;
