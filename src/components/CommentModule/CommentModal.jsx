import { createElement, useEffect, useState, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Comment, Dropdown, Menu, notification, Space, Tooltip } from 'antd';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth-context';
import { Editor as CommentEditor } from '../Editor';
import { NormalButton } from '../Button';
import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../../firebase-app/firebase-config';
import parse from 'html-react-parser';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { fromUnixTime, formatDistanceToNow, format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const CommentModalContainer = styled.div`
  .ant-comment-content-detail {
    a {
      color: #006bc2;
    }
  }
`;

const covertTimeFromNow = (time) => {
  return formatDistanceToNow(fromUnixTime(time), { locale: vi });
};

const getTime = (time) => {
  return format(fromUnixTime(time), 'PPpp', { locale: vi });
};

const CommentModal = ({ open, setOpen, blog, commentCount, setCommentCount }) => {
  const { userInfo } = useAuth();
  const [stateComment, setStateComment] = useState('Sắp xếp Tốt nhất');
  const [comment, setComment] = useState();
  const [reply, setReply] = useState();
  const [commentBox, setCommentBox] = useState([]);
  const [replyBox, setReplyBox] = useState([]);
  const [likes, setLikes] = useState({ state: false, id: null });
  const [dislikes, setDislikes] = useState({ state: false, id: null });
  const [action, setAction] = useState(null);
  const [isReply, setIsReply] = useState({ state: false, id: null });

  const like = (id) => {
    setLikes({ state: true, id: id });
    setDislikes({ state: false, id: id });
    setAction('liked');
  };

  const dislike = (id) => {
    setLikes({ state: false, id: id });
    setAction('disliked');
  };

  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, 'comments');
      const q = query(colRef, where('blogID', '==', blog.blogID));
      const querySnapshot = await getDocs(q);
      let resultComment = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        resultComment.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCommentBox(resultComment.reverse());
      setCommentCount((prev) => prev + resultComment.length);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, 'replies');
      const q = query(colRef, where('blogID', '==', blog.blogID));
      const querySnapshot = await getDocs(q);
      let resultReply = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        resultReply.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setReplyBox(resultReply);
      setCommentCount((prev) => prev + resultReply.length);
    };
    fetchData();
  }, []);
  const handleComment = () => {
    const postData = async () => {
      try {
        const commentRef = collection(db, 'comments');
        const commentData = {
          blogID: blog.blogID,
          text: comment,
          user: {
            id: userInfo.uid,
            name: userInfo.displayName,
            avatar: userInfo.photoURL,
          },
          createdAt: serverTimestamp(),
        };
        const commentSnapshot = await addDoc(commentRef, commentData);
        commentData.id = commentSnapshot.id;
        commentData.createdAt.seconds = Math.floor(Date.now() / 1000);
        setCommentBox([commentData, ...commentBox]);
        notification['success']({
          message: 'Thành công',
          description: 'Bình luận thành công',
        });
        setComment('');
        setCommentCount((prev) => prev + 1);
      } catch (err) {
        console.log('🚀 ~ file: CommentModal.jsx ~ line 33 ~ postData ~ err', err);
      }
    };
    postData();
  };

  const handleReply = (id, nameReplied) => {
    const postData = async () => {
      try {
        const replyRef = collection(db, 'replies');
        const replyData = {
          blogID: blog.blogID,
          text: reply,
          user: {
            id: userInfo.uid,
            name: userInfo.displayName,
            avatar: userInfo.photoURL,
          },
          userReply: {
            name: nameReplied,
            commentID: id,
          },
          createdAt: serverTimestamp(),
        };
        const replySnapshot = await addDoc(replyRef, replyData);
        replyData.id = replySnapshot.id;
        replyData.createdAt.seconds = Math.floor(Date.now() / 1000);
        setReplyBox([...replyBox, replyData]);
        notification['success']({
          message: 'Thành công',
          description: 'Trả lời bình luận thành công',
        });
        setReply('');
        setCommentCount((prev) => prev + 1);
      } catch (err) {
        console.log('🚀 ~ file: CommentModal.jsx ~ line 33 ~ postData ~ err', err);
      }
    };
    postData();
  };
  const handleDeleteComment = async (id) => {
    try {
      const commentRef = doc(db, 'comments', id);
      await deleteDoc(commentRef);
      notification['success']({
        message: 'Thành công',
        description: 'Xóa bình luận thành công',
      });
      const newCommentBox = commentBox.filter((item) => item.id !== id);
      setCommentBox(newCommentBox);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteReply = async (id) => {
    try {
      const replyRef = doc(db, 'replies', id);
      await deleteDoc(replyRef);
      notification['success']({
        message: 'Thành công',
        description: 'Xóa bình luận thành công',
      });
      const newReplyBox = replyBox.filter((item) => item.id !== id);
      setReplyBox(newReplyBox);
    } catch (err) {
      console.log(err);
    }
  };

  const menu = (
    <Menu
      selectable
      style={{ padding: '0', borderRadius: '2px', minWidth: '150px' }}
      items={[
        {
          label: 'Tốt nhất',
          key: 'Tốt nhất',
        },
        {
          label: 'Cũ nhất',
          key: 'Cũ nhất',
        },
        {
          label: 'Mới nhất',
          key: 'Mới nhất',
        },
      ]}
      onClick={({ key }) => setStateComment(`Sắp xếp ${key}`)}
    />
  );
  return (
    <CommentModalContainer
      className={`bg-white transition-all ease-in-out duration-500 fixed h-screen p-6 top-0 w-screen lg:w-[50vw] z-[70]  ${
        open ? 'left-0 lg:left-1/2' : 'left-full'
      }`}
    >
      {/* Comment header */}
      <div className='flex justify-between items-center '>
        <h1 className='text-[32px] font-semibold'>Bình luận</h1>
        <FontAwesomeIcon icon={faClose} size='2x' className='p-4' onClick={() => setOpen(false)} />
      </div>
      <div className='border rounded-md border-[#f3f3f3]'>
        <div className='flex justify-between px-5 py-4 border-b border-b-[#f3f3f3] bg-[#fafafa]'>
          <span className='text-base font-semibold text-[#454647]'>{`${commentCount} Bình luận`}</span>
          <Dropdown overlay={menu} trigger={['click']} placement='bottomRight'>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <span className='text-xs font-semibold text-[#454647]'>{stateComment}</span>
                <FontAwesomeIcon icon={faCaretDown} className='text-[#454647]' />
              </Space>
            </a>
          </Dropdown>
        </div>
        {userInfo ? (
          <div className=' p-[14px] h-screen overflow-scroll'>
            {/* Comment input */}
            <div className='flex items-center gap-x-2'>
              <div className='max-w-[40px] min-w-[40px] h-10 '>
                <img src={userInfo?.photoURL} className='w-full h-full object-cover rounded-full' />
              </div>
              <div className='w-full'>
                <CommentEditor value={comment} setValue={setComment} placeholder='Bình luận tại đây' />
                <NormalButton title='BÌNH LUẬN' className='w-full mt-3 block' primary onClick={handleComment} />
              </div>
            </div>

            {/* Comment box */}
            <div className='pb-8'>
              {commentBox.length >= 1 &&
                commentBox?.map((commentItem, index) => (
                  <Comment
                    actions={[
                      <span onClick={() => like(commentItem.id)}>
                        {createElement(action === 'liked' && likes.id === commentItem.id ? LikeFilled : LikeOutlined)}
                        <span className='comment-action'>{1}</span>
                      </span>,
                      <span onClick={() => dislike(commentItem.id)}>
                        {createElement(
                          action === 'disliked' && dislikes.id === commentItem.id ? DislikeFilled : DislikeOutlined
                        )}
                        <span className='comment-action'>{1}</span>
                      </span>,
                      <span
                        key='comment-basic-reply-to'
                        onClick={() => setIsReply({ state: true, id: commentItem.id })}
                      >
                        Trả lời
                      </span>,
                      userInfo.uid === commentItem.user.id && (
                        <span className='' onClick={() => handleDeleteComment(commentItem.id)}>
                          Xóa
                        </span>
                      ),
                    ]}
                    key={commentItem.id}
                    author={<Link to={`/thong-tin-tai-khoan/${commentItem.user.id}`}>{commentItem.user.name}</Link>}
                    avatar={<Avatar src={commentItem.user.avatar} alt={commentItem.user.name} />}
                    content={parse(commentItem.text)}
                    datetime={
                      <Tooltip title={getTime(commentItem.createdAt.seconds)}>
                        <span>{covertTimeFromNow(commentItem.createdAt.seconds)}</span>
                      </Tooltip>
                    }
                  >
                    {replyBox?.map(
                      (replyItem, index) =>
                        replyItem.userReply.commentID === commentItem.id && (
                          <Comment
                            actions={[
                              userInfo.uid === replyItem.user.id && (
                                <span className='' onClick={() => handleDeleteReply(replyItem.id)}>
                                  Xóa
                                </span>
                              ),
                            ]}
                            key={replyItem.id}
                            author={<Link to={`/user/${replyItem.user.id}`}>{replyItem.user.name}</Link>}
                            avatar={<Avatar src={replyItem.user.avatar} alt={replyItem.user.name} />}
                            content={parse(replyItem.text)}
                            datetime={
                              <Tooltip title={getTime(replyItem.createdAt.seconds)}>
                                <span>{covertTimeFromNow(replyItem.createdAt.seconds)}</span>
                              </Tooltip>
                            }
                          />
                        )
                    )}
                    {isReply.state && isReply.id === commentItem.id && (
                      <div className='w-full'>
                        <CommentEditor value={reply} setValue={setReply} placeholder='Phản hồi bình luận' />
                        <div className='flex gap-x-1 mt-3'>
                          <NormalButton
                            title='Hủy'
                            className='w-full bg-white text-black'
                            onClick={() => setIsReply({ state: false, id: commentItem.id })}
                          />
                          <NormalButton
                            title='TRẢ LỜI'
                            className='w-full'
                            onClick={() => handleReply(commentItem.id, commentItem.user.name)}
                          />
                        </div>
                      </div>
                    )}
                  </Comment>
                ))}
            </div>
          </div>
        ) : (
          <div className='p-[14px] flex items-center justify-center'>
            <p>
              Hãy{' '}
              <Link className='text-light-green-font font-semibold' to='/dang-nhap'>
                Đăng nhập
              </Link>{' '}
              hoặc{' '}
              <Link className='text-light-green-font font-semibold' to='/dang-ki'>
                Đăng ký
              </Link>{' '}
              để xem bình luận
            </p>
          </div>
        )}
      </div>
    </CommentModalContainer>
  );
};

export default memo(CommentModal);
