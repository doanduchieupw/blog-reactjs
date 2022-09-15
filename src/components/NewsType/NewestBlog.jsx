import { PostWithImgBg } from '../NewsModule';
import { TitleSection } from '../NewsModule';

const postData = [{}];

const NewestBlog = () => {
  return (
    <div className="mt-8 md:mt-10">
      <TitleSection firstWord="Mới" secondWord="nhất" />
      <PostWithImgBg srcImg="https://img.vietcetera.com/uploads/images/10-aug-2022/feature-1660174304625.jpg" />

      <PostWithImgBg srcImg="https://img.vietcetera.com/uploads/images/12-sep-2022/dienanh-guide-1--1662971127985.jpg" />
    </div>
  );
};

export default NewestBlog;
