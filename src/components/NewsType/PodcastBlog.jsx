import { PodcastMain, PodcastSub, TitleSection } from '../NewsModule';

const PodcastBlog = () => {
  return (
    <div className='mt-14'>
      <TitleSection firstWord='Nghe gì' secondWord='hôm nay' />
      <div className='w-full lg:flex'>
        <PodcastMain />
        <div className='lg:w-1/2 lg:flex lg:flex-col lg:justify-between'>
          <PodcastSub />
          <PodcastSub />
          <PodcastSub />
        </div>
      </div>
    </div>
  );
};

export default PodcastBlog;
