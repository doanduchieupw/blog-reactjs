import styled from 'styled-components';

const BlogHeaderContainer = styled.div`
  .indicator {
    width: ${(props) => `${props.process}%`};
  }
`;
const BlogHeader = ({ title, process }) => {
  console.log('🚀 ~ file: BlogHeader.jsx ~ line 9 ~ BlogHeader ~ process', process);
  return (
    <BlogHeaderContainer
      process={process}
      className='flex sticky top-0 left-0 w-screen bg-white h-16 z-[60] animate-switchDown'
    >
      <h1 className='flex items-center px-2 my-4 text-lg font-bold tracking-wider border-r-2'>TechEBlog</h1>
      <div className='flex-1 flex flex-col ml-2 justify-center'>
        <span className='text-xs font-semibold uppercase text-light-green-font'>Đang đọc</span>
        <h3 className='line-clamp-2 leading-[16px]'>{title}</h3>
      </div>
      <div className='indicator absolute bg-light-green-font h-1 bottom-0'></div>
    </BlogHeaderContainer>
  );
};

export default BlogHeader;
