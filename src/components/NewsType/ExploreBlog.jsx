import BorderButton from '../Button/BorderButton';
import { PostWithImgBg, TitleSection } from '../NewsModule';

const ExploreBlog = () => {
  return (
    <div className='mt-20 md:mt-14'>
      <TitleSection firstWord='Tóm' secondWord='lại là' />
      <div className='flex items-center justify-between '>
        <p className='my-4 max-w-xl text-sm leading-[1.7] text-[#555]'>
          Trả lời ngắn gọn các câu hỏi quan trọng nhất xung quanh một sự kiện: Ai? Làm gì? Khi nào? Ở đâu? Bao nhiêu? Như thế nào? Tại sao?
        </p>
        <BorderButton title='Xem tất cả' className='px-4 py-2 border border-gray-border rounded-full hidden md:block' />
      </div>
      <div className='flex flex-wrap gap-x-2 xs:mb-6'>
        <PostWithImgBg srcImg='https://img.vietcetera.com/uploads/images/10-aug-2022/feature-1660174304625.jpg' />

        <PostWithImgBg srcImg='https://img.vietcetera.com/uploads/images/12-sep-2022/dienanh-guide-1--1662971127985.jpg' />
      </div>
      <div className='w-full flex justify-center md:hidden'>
        <BorderButton title='Xem tất cả' className='w-fit px-4 py-2 border border-gray-border rounded-full ' />
      </div>
    </div>
  );
};

export default ExploreBlog;
