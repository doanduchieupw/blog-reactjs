import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase-app/firebase-config';
import { BlogHeader } from '../components/Header';
import { BlogContent, BlogAction, Hashtag } from '../components/BlogModule';
import { CommentModal } from '../components/CommentModule';
import { fromNow } from '../utils/time';

const FullBlog = ({ layoutRef }) => {
  const { slug } = useParams();
  const [blog, setBlog] = useState();
  const [isOpenComment, setOpenComment] = useState(false);
  const [showBlogHeader, setShowBlogHeader] = useState({ state: false, position: 0 });
  const navigate = useNavigate();
  const contentRef = useRef();
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    const handleScroll = (event) => {
      if (layoutRef.current.scrollTop > 500) {
        setShowBlogHeader({
          state: true,
          position: Math.floor((layoutRef.current.scrollTop / (layoutRef.current.scrollHeight - 500)) * 100),
        });
      } else {
        setShowBlogHeader({
          state: false,
          position: Math.floor((layoutRef.current.scrollTop / (layoutRef.current.scrollHeight - 500)) * 100),
        });
      }
    };

    layoutRef.current.addEventListener('scroll', handleScroll);

    return () => {
      layoutRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRef = collection(db, 'blogs');
        const blogQuery = query(blogRef, where('slugBlog', '==', slug));
        const blogSnapshot = await getDocs(blogQuery);
        if (blogSnapshot.empty) {
          navigate('/khong-ton-tai');
          return;
        }
        blogSnapshot.forEach((doc) => {
          setBlog({
            blogID: doc.id,
            ...doc.data(),
            createdAtFormat: fromNow(doc.data().createdAt.seconds),
            keywordBlog: doc.data().keywordBlog.split('#'),
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (!blog) return;
    document.title = blog.titleBlog;
  }, [blog]);
  return (
    <div className=''>
      {blog && (
        <div className='relative min-h-full pt-14'>
          {showBlogHeader.state && <BlogHeader title={blog.titleBlog} process={showBlogHeader.position} />}
          <div ref={contentRef} className='max-w-6xl lg:mx-auto'>
            <div className=''>
              {/* First part of blog */}
              <div className=' w-[90%] max-w-[540px] lg:max-w-3xl mx-auto '>
                <div className='mt-6'>
                  {/* Time */}
                  <span className='text-xs xs:text-sm text-lighter-gray-font'>{`${blog?.createdAtFormat.replace(
                    'khoảng',
                    ''
                  )} trước.`}</span>
                  {/* Title */}
                  <h1 className='text-[26px] xs:text-[40px] leading-[34px] xs:leading-[54px] font-bold text-primary-bg tracking-normal my-4'>
                    {blog.titleBlog}
                  </h1>
                  <div className='mb-4 text-sm xs:text-base leading-6 text-lighter-gray-font font-merriweather '>
                    {blog.excerptBlog}
                  </div>
                  {/* Author */}
                  <div className='flex justify-between'>
                    <div className='flex gap-x-2 items-center lg:shrink-0'>
                      <Link
                        to={`/thong-tin-tai-khoan/${blog.user.id}`}
                        className='w-10 h-10 bg-transparent cursor-pointer'
                      >
                        <img
                          src={blog.user.photoAvatar}
                          alt={blog.user.displayName}
                          className='w-10 h-10 object-cover rounded-full'
                        />
                      </Link>
                      <div className='flex flex-col max-w-xl justify-center tracking-wider'>
                        <span className='line-clamp-1 uppercase text-xs lg:hidden'>Tác giả</span>
                        <Link
                          to={`/thong-tin-tai-khoan/${blog.user.id}`}
                          className='text-sm font-semibold text-light-green-font cursor-pointer line-clamp-1'
                        >
                          {blog.user.displayName}
                        </Link>
                      </div>
                    </div>
                    <div className='hidden lg:block'>
                      <BlogAction
                        title={blog.titleBlog}
                        process={showBlogHeader.position}
                        setOpen={setOpenComment}
                        commentCount={commentCount}
                        blog={blog}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Second part of blog */}
              <div className='my-8 mx-auto max-w-[969px]'>
                <img src={blog.imageBlog} alt={blog.titleBlog} className='w-full h-auto' />
                <p className='mt-2 mb-8 px-4 font-merriweather font-light text-sm leading-[22px] text-light-gray-font'>
                  {blog.captionImageBlog}
                </p>
              </div>
              {/* Content of blog */}
              <BlogContent content={blog.contentBlog} />
              <div className='px-4 xs:px-0 max-w-[540px] md:max-w-[568px] mx-auto mb-6'>
                {blog.keywordBlog.map((item, index) => {
                  if (index === 0) return;
                  return <Hashtag key={index} content={item} />;
                })}
              </div>
            </div>
          </div>
          <div className='block lg:hidden'>
            {showBlogHeader.state && (
              <BlogAction
                title={blog.titleBlog}
                process={showBlogHeader.position}
                setOpen={setOpenComment}
                commentCount={commentCount}
                blog={blog}
              />
            )}
          </div>
          {isOpenComment && (
            <div
              className='absolute top-0 bg-primary-bg opacity-20 z-[60] w-full h-full'
              onClick={() => setOpenComment(false)}
            ></div>
          )}
          <CommentModal
            open={isOpenComment}
            setOpen={setOpenComment}
            blog={blog}
            commentCount={commentCount}
            setCommentCount={setCommentCount}
          />
        </div>
      )}
    </div>
  );
};

export default FullBlog;
