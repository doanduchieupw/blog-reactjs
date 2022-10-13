import React, { useEffect, useState } from 'react';
import { NoDataManage, TitleManage } from '../../components/ManageModule';
import { getUserInfo } from '../../hooks';
import { CircleLoading } from '../../components/LoadingSkeleton';
import { Tooltip } from 'antd';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-app/firebase-config';

function TopicManage() {
  const [user, setUser] = getUserInfo();
  const [topic, setTopic] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) return;
    setTopic(user.topic);
  }, [user]);
  const handleUnSubTopic = (topicName) => {
    const updateData = async () => {
      const userRef = doc(db, 'users', user.userID);
      await updateDoc(userRef, {
        topic: arrayRemove(topicName),
      });
      setTopic(topic.filter((item) => item !== topicName));
    };
    updateData();
  };
  return (
    <div className='min-h-[75vh]'>
      <TitleManage title='Bài viết đã thích' />
      {user && !loading && (
        <div className='mt-6 flex flex-wrap gap-4'>
          {topic.length >= 1 &&
            topic.map((item, index) => (
              <Tooltip placement='top' title='Bỏ theo dõi'>
                <span
                  className='px-4 py-3 bg-primary-bg text-white rounded-full cursor-pointer'
                  onClick={() => handleUnSubTopic(item)}
                >
                  {item}
                </span>
              </Tooltip>
            ))}
        </div>
      )}
      {user && JSON.stringify(user.topic) === JSON.stringify([]) && (
        <NoDataManage
          title='Bạn chưa theo dõi chủ đề nào'
          desc='Hãy theo dõi các chủ đề yêu thích để nhận được những nội dung dành riêng cho bạn.'
        />
      )}
      {loading && <CircleLoading />}
    </div>
  );
}

export default TopicManage;
