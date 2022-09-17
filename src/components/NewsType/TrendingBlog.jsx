import { PostWithTitle, TitleSection } from '../NewsModule';

const TrendingBlog = () => {
  return (
    <div className="mt-20 xs:mt-14 flex">
      <div className='lg:w-1/2'>
        <TitleSection firstWord="Xu" secondWord="hướng" />
        <div className="w-full">
          <PostWithTitle />
          <PostWithTitle />
          <PostWithTitle />
          <PostWithTitle />
          <PostWithTitle />
        </div>
      </div>
      <div className="hidden w-1/2 lg:flex flex-col justify-start items-end ">
        <img
          src="https://img.vietcetera.com/uploads/images/05-sep-2022/thtl-skyscrapper.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default TrendingBlog;
