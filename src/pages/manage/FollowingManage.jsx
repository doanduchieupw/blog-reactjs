import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { CircleLoading } from '../../components/LoadingSkeleton';
import { NoDataManage, TitleManage, UserFollowCard } from '../../components/ManageModule';
import { db } from '../../firebase-app/firebase-config';
import getUserInfo from '../../hooks/getUserInfo';

function FollowingManage() {
  const [following, setFollowing] = useState([]);
  const [user, setUser] = getUserInfo();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    let ids = [...user.folowing];
    const newFollowingList = [];
    const fetchData = async (ids) => {
      try {
        setLoading(true);
        for (let id of ids) {
          const userRef = doc(db, 'users', id);
          const userSnapshot = await getDoc(userRef);
          newFollowingList.push({ userID: userSnapshot.id, ...userSnapshot.data() });
        }
        setFollowing(newFollowingList);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData(ids);
  }, [user]);
  return (
    <div className='min-h-[75vh]'>
      <TitleManage title='Tác giả đang theo dõi' />
      {following &&
        !loading &&
        following.map((item, index) => <UserFollowCard image={item.photoAvatar} name={item.fullname} />)}
      {loading && <CircleLoading />}
      {JSON.stringify(following) === JSON.stringify([]) && !loading && (
        <NoDataManage
          title='Bạn chưa theo dõi tác giả nào'
          desc='Hãy theo dõi để ủng hộ tác giả và cập nhật nhanh chóng những nội dung mới nhất từ những tác giả mà bạn yêu
            thích.'
        />
      )}
    </div>
  );
}

export default FollowingManage;
