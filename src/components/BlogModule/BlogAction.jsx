import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState, memo, useRef } from 'react';
import _debounce from 'lodash/debounce';
import { BookmarkIcon, CommentIcon, FacebookBlackIcon, GetLinkIcon, HeartIcon, UnHeartIcon } from '../../assets/icons';
import { db } from '../../firebase-app/firebase-config';
import { useAuth } from '../../contexts/auth-context';
import styled from 'styled-components';

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
  const handleReactionBlog = (heartCount) => {
    const postData = async () => {
      try {
        const blogRef = doc(db, 'blogs', blog.blogID);
        await updateDoc(blogRef, {
          like: { count: heartCount, user: isHearted.user },
        });
      } catch (err) {
        console.log(err);
      }
    };
    postData();
  };
  // const debounceHeartCountFn = useCallback(_debounce(handleReactionBlog, 2000), [isHearted]);
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
            setHeartCount((prev) => prev + 1);
            handleReactionBlog(heartCount);
          }}
        >
          {isHearted.state ? <HeartIcon className='animate-pulse' /> : <UnHeartIcon />}
          <span className='text-xs leading-snug font-semibold'>{heartCount}</span>
        </button>

        <div className='h-8 w-px bg-slate-200'></div>

        <button className='px-1 flex items-center gap-x-2 lg:px-4'>
          <BookmarkIcon />
          <span className='hidden lg:inline-block uppercase text-xs font-semibold'>Bookmark</span>
        </button>

        <button className='px-3 py-1.5 flex items-center gap-x-2 lg:px-4'>
          <FacebookBlackIcon />
          <span className='hidden lg:inline-block uppercase text-xs font-semibold'>Share</span>
        </button>

        <button className='px-1 flex items-center gap-x-2 lg:px-4'>
          <GetLinkIcon />
          <span className='hidden lg:inline-block uppercase text-xs font-semibold'>Copy Link</span>
        </button>
      </div>
    </BlogActionContainer>
  );
};

export default memo(BlogAction);
