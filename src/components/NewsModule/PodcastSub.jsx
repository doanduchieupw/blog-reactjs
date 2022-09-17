import PodcastPlayer from './PodcastPlayer';

const PodcastSub = () => {
  return (
    <div className='w-full flex flex-col items-center mb-4'>
      <div className='w-full flex'>
        {/* ImageBlog */}
        <div className='w-2/5 lg:w-1/3'>
          <img
            src='https://i.scdn.co/image/ab6765630000ba8a3579465d253a566d833977f2'
            className='rounded-2xl shadow-lg w-full h-auto aspect-square'
          />
        </div>
        {/* TitleSection */}
        <div className='w-[calc(60%-16px)] lg:w-[calc(66.66667%-16px)] ml-4 flex flex-col items-start justify-center'>
          <span className='my-1 text-xs font-semibold uppercase line-clamp-1 text-[#0c5dff]'>
            Vietnam Innovators (Tiếng Việt)
          </span>
          <h3 className=' text-base md:text-xl font-semibold line-clamp-3'>
            S3#15 Alex Phạm, CEO & Co-founder, Realbox: Bất động sản phân mảnh - cơ hội đầu tư cho số đông
          </h3>
          <div className='w-full hidden md:block'>
            <PodcastPlayer sub />
          </div>
        </div>
      </div>
      <div className='w-full md:hidden'>
        <PodcastPlayer sub />
      </div>
    </div>
  );
};

export default PodcastSub;
