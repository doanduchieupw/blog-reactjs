const BlogHeader = ({ title }) => {
  return (
    <div className='flex sticky top-0 left-0 w-screen bg-white h-16 z-[60]'>
      <h1 className='flex items-center px-2 my-4 text-lg font-bold tracking-wider border-r-2'>TechEBlog</h1>
      <div className='flex-1 flex flex-col'>
        <span className='text-xs font-semibold uppercase'>Đang đọc</span>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default BlogHeader;
