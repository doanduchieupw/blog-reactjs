import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { TitleManage, UserFollowCard } from '../../components/ManageModule';
import { db } from '../../firebase-app/firebase-config';
import getUserInfo from '../../hooks/getUserInfo';

function FollowingManage() {
  const [following, setFollowing] = useState([]);
  const [user, setUser] = getUserInfo();

  useEffect(() => {
    if (!user) return;
    let ids = [...user.folowing];
    const newFollowingList = [];
    const fetchData = async (ids) => {
      try {
        for (let id of ids) {
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
    <div className='min-h-[75vh]'>
      <TitleManage title='Tác giả đang theo dõi' />
      {following && following.map((item, index) => <UserFollowCard image={item.photoAvatar} name={item.fullname} />)}
      {JSON.stringify(following) === JSON.stringify([]) && (
        <div className='min-h-[600px] bg-[#f7f7f7] px-8 py-6 mt-6'>
          <h1 className='text-xl font-semibold mb-2'>Bạn chưa theo dõi tác giả nào</h1>
          <p className='text-base'>
            Hãy theo dõi để ủng hộ tác giả và cập nhật nhanh chóng những nội dung mới nhất từ những tác giả mà bạn yêu
            thích.
          </p>
        </div>
      )}
    </div>
  );
}

export default FollowingManage;
