import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState, memo } from 'react';
import _debounce from 'lodash/debounce';
import { CommentIcon, FacebookBlackIcon, GetLinkIcon, HeartIcon, UnHeartIcon } from '../../assets/icons';
import { db } from '../../firebase-app/firebase-config';
import { useAuth } from '../../contexts/auth-context';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import { useBookmark } from '../../hooks';
import { notification } from 'antd';

const BlogActionContainer = styled.div`
  @keyframes pulse {
    to {
      scale: 1.2;
    }
  }
`;

const BlogAction = ({ setOpen, commentCount, blog }) => {
  const { userInfo } = useAuth();
  const [heartCount, setHeartCount] = useState(0);
  const [isHearted, setIsHearted] = useState({ state: false, user: [] });
  const [isBookMark, setIsBookMark, handleBookmark] = useBookmark(blog.blogID);
  const handleReactionBlog = (heartCount) => {
    const postData = async () => {
      try {
        const blogRef = doc(db, 'blogs', blog.blogID);
        await updateDoc(blogRef, {
          like: { count: heartCount + 1, user: isHearted.user },
        });
      } catch (err) {
        console.log(err);
      }
    };
    postData();
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    notification['success']({
      message: 'Sao chép thành công',
      description: 'Link bài viết được lưu vào bộ nhớ tạm',
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRef = doc(db, 'blogs', blog.blogID);
        const blogSnapshot = await getDoc(blogRef);
        setHeartCount(blogSnapshot.data().like.count);
        if (blogSnapshot.data().like.user.includes(userInfo.uid)) {
          setIsHearted({ state: true, user: [...blogSnapshot.data().like.user] });
        } else {
          setIsHearted({ state: false, user: [...blogSnapshot.data().like.user, userInfo.uid] });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <BlogActionContainer className='fixed bottom-0 left-0 right-0 w-full h-14 py-3 bg-white border-t border-t-slate-200 z-[60] animate-switchUp lg:static lg:border-0'>
      <div className='flex w-full justify-around items-center lg:flex-row-reverse'>
        <button className='flex items-center py-1.5 px-1 gap-x-2 lg:px-4' onClick={() => setOpen(true)}>
          <CommentIcon />
          <span className='text-xs leading-snug font-semibold'>{commentCount}</span>
        </button>

        <button
          className='flex items-center py-1 gap-x-2 lg:px-4'
          onClick={() => {
            if (!userInfo) {
              notification['warning']({
                message: 'Cảnh báo',
                description: 'Vui lòng đăng nhập',
              });
              return;
            }
            setHeartCount((prev) => prev + 1);
            setIsHearted((prev) => ({
              ...prev,
              state: true,
            }));
            handleReactionBlog(heartCount);
          }}
        >
          {isHearted.state ? <HeartIcon className='animate-pulse' /> : <UnHeartIcon />}
          <span className='text-xs leading-snug font-semibold'>{heartCount}</span>
        </button>

        <div className='h-8 w-px bg-slate-200'></div>

        <button className='px-1 flex items-center gap-x-2 lg:px-4' onClick={handleBookmark}>
          {isBookMark ? <FontAwesomeIcon icon={fasBookmark} /> : <FontAwesomeIcon icon={farBookmark} />}
          <span className='hidden lg:inline-block uppercase text-xs font-semibold'>Bookmark</span>
        </button>

        <button className='px-3 py-1.5 flex items-center gap-x-2 lg:px-4'>
          <FacebookBlackIcon />
          <span className='hidden lg:inline-block uppercase text-xs font-semibold'>Share</span>
        </button>

        <button className='px-1 flex items-center gap-x-2 lg:px-4' onClick={handleCopy}>
          <GetLinkIcon />
          <span className='hidden lg:inline-block uppercase text-xs font-semibold'>Copy Link</span>
        </button>
      </div>
    </BlogActionContainer>
  );
};

export default memo(BlogAction);
