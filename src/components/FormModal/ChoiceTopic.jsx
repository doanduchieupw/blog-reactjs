import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon } from '../../assets/icons';
import { useAuth } from '../../contexts/auth-context';
import { db } from '../../firebase-app/firebase-config';

const ChoiceTopic = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [topic, setTopic] = useState();
  const [choice, setChoice] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const topicRef = collection(db, 'topic');
      const topicSnapshot = await getDocs(topicRef);
      const topicResult = [];
      topicSnapshot.forEach((doc) => {
        topicResult.push({
          topicID: doc.id,
          ...doc.data(),
        });
      });
      setTopic(topicResult);
    };
    fetchData();
  }, []);
  const handleChoice = () => {
    const updateData = async () => {
      const userRef = doc(db, 'users', userInfo.uid);
      await updateDoc(userRef, {
        topic: choice,
      });
      navigate('/');
    };
    updateData();
  };
  const handleClose = () => {
    navigate('/');
  };
  return (
    <div className='flex flex-col items-center min-h-screen'>
      <div className='w-full h-14 sticky top-0 bg-white border-b border-b-slate-200 text-xl font-semibold text-black flex justify-center'>
        <div className='relative max-w-[668px] w-full flex justify-center items-center'>
          <span>Chọn chủ đề</span>
          <button
            className='absolute right-6 text-sm font-semibold uppercase underline text-light-gray-font px-3 py-2 hover:bg-gray-bg-btn hover:text-primary-bg rounded-full duration-200'
            onClick={handleClose}
          >
            Bỏ qua
          </button>
        </div>
      </div>
      <div className='max-w-[668px] p-2 md:p-5 lg:p-10 flex-1'>
        <div className='w-full flex flex-col items-start mb-12'>
          <span className='text-sm font-semibold text-light-gray-font uppercase'>Bước 2</span>
          <span className='text-[32px] font-semibold text-black mt-2'>Chọn chủ đề yêu thích của bạn</span>
          <span className='text-sm font-normal text-gray-submenu-font mt-2'>Ít nhất 3 chủ đề để tiếp tục</span>
        </div>
        {topic && (
          <div className='flex items-start justify-start flex-wrap gap-4'>
            {topic.map((item, index) => (
              <button
                key={index}
                className={`text-sm font-semibold  uppercase px-4 py-2  rounded-full duration-200 ${
                  choice.includes(item.name)
                    ? 'flex items-center text-white bg-primary-bg hover:opacity-80'
                    : 'bg-gray-bg-btn hover:dark-gray-bg border border-lightest-gray'
                }`}
                onClick={() => {
                  if (choice.includes(item.name)) {
                    setChoice(choice.filter((itemChoice) => itemChoice !== item.name));
                  } else {
                    setChoice([...choice, item.name]);
                  }
                }}
              >
                {choice.includes(item.name) && <CheckIcon className='mr-2' />}
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className='sticky bottom-0 h-16  w-full px-4 py-2 flex items-center justify-center bg-white border-t border-slate-200 '>
        <div className='flex items-center justify-between max-w-[668px] w-full'>
          <span className='text-base tracking-wider text-gray-submenu-font'>{`Đã chọn ${choice.length}/3`}</span>
          <button
            className={`text-sm font-semibold uppercase px-4 py-3 bg-primary-bg rounded-full text-white ${
              choice.length >= 3 ? 'opacity-100' : 'opacity-25'
            } `}
            disabled={choice.length >= 3 ? false : true}
            onClick={handleChoice}
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoiceTopic;
