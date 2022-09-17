import {
  NewestBlog,
  ForYouBlog,
  ExploreBlog,
  TrendingBlog,
  PodcastBlog,
} from '../components/NewsType';

const Home = () => {
  return (
    <div className="w-[90%] max-w-6xl mx-auto">
      <NewestBlog />
      <ExploreBlog />
      <TrendingBlog />
      <PodcastBlog />
    </div>
  );
};

export default Home;
