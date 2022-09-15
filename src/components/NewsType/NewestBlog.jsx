import { TitleSection, PostWithImgBg, PostFullElement } from '../NewsModule';

const postData = [{}];

const NewestBlog = () => {
  return (
    <div className="mt-8 md:mt-10">
      <TitleSection firstWord="Mới" secondWord="nhất" />
      <div className='flex flex-wrap gap-x-2 xs:mb-6'>
        <PostWithImgBg srcImg="https://img.vietcetera.com/uploads/images/10-aug-2022/feature-1660174304625.jpg" />
  
        <PostWithImgBg srcImg="https://img.vietcetera.com/uploads/images/12-sep-2022/dienanh-guide-1--1662971127985.jpg" />
      </div>
      
      <div className='flex flex-wrap md:-mx-4'>
        <PostFullElement />
        <PostFullElement />
        <PostFullElement />
        <PostFullElement />
      </div>
    </div>
  );
};

export default NewestBlog;
