import { BookmarkIcon, CommentIcon, FacebookBlackIcon, GetLinkIcon, UnHeartIcon } from '../../assets/icons';

const BlogAction = ({ setOpen, commentCount }) => {
  return (
    <div className='fixed bottom-0 left-0 right-0 w-full h-14 py-3 bg-white border-t border-t-slate-200 z-[60] animate-switchUp'>
      <div className='flex w-full justify-around items-center'>
        <button className='flex items-center py-1.5 px-1 gap-x-2' onClick={() => setOpen(true)}>
          <CommentIcon />
          <span className='text-xs leading-snug font-semibold'>{commentCount}</span>
        </button>

        <button className='flex items-center py-1 gap-x-2'>
          <UnHeartIcon />
          <span className='text-xs leading-snug font-semibold'>39</span>
        </button>

        <div className='h-8 w-px bg-slate-200'></div>

        <button className='px-1'>
          <BookmarkIcon />
        </button>

        <button className='px-3 py-1.5'>
          <FacebookBlackIcon />
        </button>

        <button className='px-1'>
          <GetLinkIcon />
        </button>
      </div>
    </div>
  );
};

export default BlogAction;
