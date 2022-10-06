import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { NoDataManage, TitleManage } from '../../components/ManageModule';
import { BlogCard } from '../../components/BlogModule';
import { db } from '../../firebase-app/firebase-config';
import { getUserInfo } from '../../hooks';
import { fromNow } from '../../utils/time';
import { CircleLoading } from '../../components/LoadingSkeleton';

function LikeManage() {
  const [user, setUser] = getUserInfo();
  const [likeBlog, setLikeBlog] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const blogRef = collection(db, 'blogs');
        const blogQuery = query(blogRef, where('like.user', 'array-contains', user.userID), limit(10));
        const blogSnapshot = await getDocs(blogQuery);
        const blogResult = [];
        blogSnapshot.forEach((doc) => {
          blogResult.push({
            blogID: doc.id,
            ...doc.data(),
            createdAt: fromNow(doc.data().createdAt.seconds),
          });
        });
        setLikeBlog(blogResult);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);
  return (
    <div className='min-h-[75vh]'>
      <TitleManage title='Bài viết đã thích' />
      {likeBlog &&
        !loading &&
        likeBlog.map((item, index) => (
          <BlogCard
            image={item.imageBlog}
            title={item.titleBlog}
            desc={item.excerptBlog}
            createdAt={item.createdAt}
            slug={item.slugBlog}
            authorName={item.user.displayName}
            authorAvatar={item.user.photoAvatar}
            isManage
          />
        ))}
      {JSON.stringify(likeBlog) === JSON.stringify([]) && (
        <NoDataManage
          title='Bạn chưa thích bài viết nào'
          desc='Hãy thả tim bài viết để động viên tác giả cũng như dễ dàng tìm lại nội dung yêu thích.'
        />
      )}
      {loading && <CircleLoading />}
    </div>
  );
}

export default LikeManage;
