import { PodcastMain, PodcastSub, TitleSection } from '../NewsModule';

const PodcastBlog = () => {
  return (
    <div className="mt-14">
      <TitleSection firstWord="Nghe gì" secondWord="hôm nay" />
      <div className="lg:flex">
        <PodcastMain />
        <div className='basis-1/2'>
          <PodcastSub />
          <PodcastSub />
          <PodcastSub />
          <PodcastSub />
        </div>
      </div>
    </div>
  );
};

export default PodcastBlog;
