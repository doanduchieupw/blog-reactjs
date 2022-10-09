import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BlogCard } from '../../components/BlogModule';
import { CircleLoading } from '../../components/LoadingSkeleton';
import { NoDataManage, TitleManage } from '../../components/ManageModule';
import { db } from '../../firebase-app/firebase-config';
import { getUserInfo, useBookmark } from '../../hooks';
import { fromNow } from '../../utils/time';

function BookmarkManage() {
  // const [isBookMark, setIsBookMark, handleBookmark] = useBookmark(blogID);
  const [user, setUser] = getUserInfo();
  const [bookmarkBlog, setBookmarkBlog] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const blogRef = collection(db, 'blogs');
        const blogQuery = query(blogRef, where('bookmark', 'array-contains', user.userID), limit(10));
        const blogSnapshot = await getDocs(blogQuery);
        const blogResult = [];
        blogSnapshot.forEach((doc) => {
          blogResult.push({
            blogID: doc.id,
            ...doc.data(),
            createdAt: fromNow(doc.data().createdAt.seconds),
          });
        });
        setBookmarkBlog(blogResult);
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
      <TitleManage title='Bài viết đã lưu' />
      {bookmarkBlog &&
        !loading &&
        bookmarkBlog.map((item, index) => (
          <BlogCard
            image={item.imageBlog}
            title={item.titleBlog}
            desc={item.excerptBlog}
            createdAt={item.createdAt}
            slug={item.slugBlog}
            authorName={item.user.displayName}
            authorAvatar={item.user.photoAvatar}
            isManage
            bookmark
          />
        ))}
      {JSON.stringify(bookmarkBlog) === JSON.stringify([]) && (
        <NoDataManage
          title='Bạn chưa thích bài viết nào'
          desc='Hãy thả tim bài viết để động viên tác giả cũng như dễ dàng tìm lại nội dung yêu thích.'
        />
      )}
      {loading && <CircleLoading />}
    </div>
  );
}

export default BookmarkManage;
