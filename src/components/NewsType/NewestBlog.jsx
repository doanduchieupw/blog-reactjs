import { PostWithImgBg } from '../NewsModule';
import { TitleSection } from '../NewsModule';

const postData = [{}];

const NewestBlog = () => {
  return (
    <div className='mt-8 md:mt-10'>
      <TitleSection firstWord='Mới' secondWord='nhất' />
      <PostWithImgBg srcImg='https://img.vietcetera.com/uploads/images/10-aug-2022/feature-1660174304625.jpg' />

      <PostWithImgBg srcImg='https://imgproxy.k7.tinhte.vn/8z-EnStVO22pWzWWNHRIZ8gT3WBY00XfNZIJnEFLlMw/rs:fill:480:300:0/plain/http://data.tinhte.vn/data/attachment-files/2022/08/6077217_Cover_doi-hinh-nen-man-hinh-khoa.jpg' />

      <PostWithImgBg srcImg='https://photo2.tinhte.vn/data/attachment-files/2022/09/6123428_Thu_thua_iOS16.9.jpg' />
    </div>
  );
};

export default NewestBlog;
