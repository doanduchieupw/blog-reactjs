import { useEffect } from 'react';
import { NewestBlog, ExploreBlog, TrendingBlog, PodcastBlog } from '../components/NewsType';

const Home = ({ layoutRef }) => {
  useEffect(() => {
    document.title = 'TechEBlog | Trang chủ';
  }, []);
  useEffect(() => {
    layoutRef.current.scroll({
      top: 0,
      scroll: 'smooth',
    });
  }, []);
  return (
    <div className='w-[90%] max-w-6xl mx-auto pt-14'>
      <NewestBlog />
      <ExploreBlog />
      <TrendingBlog />
      <PodcastBlog type='audio' />
      <PodcastBlog type='video' />
    </div>
  );
};

export default Home;
