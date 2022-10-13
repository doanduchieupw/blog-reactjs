import { Link } from 'react-router-dom';
import PodcastPlayer from './PodcastPlayer';
import { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PodcastSub = ({ image, url, topic, title, slug, type }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className='relative w-full flex flex-col items-center mb-4'>
      <div className='w-full flex'>
        {/* ImageBlog */}
        {type === 'audio' && (
          <Link to={`/podcast/${slug}`} className='w-2/5 lg:w-1/3'>
            <img src={image} className='rounded-2xl shadow-lg w-full h-auto aspect-square' />
          </Link>
        )}
        {type === 'video' && (
          <div to={`/podcast/${slug}`} className='relative w-2/5 lg:w-1/3'>
            <img src={image} className='rounded-2xl shadow-lg w-full h-auto object-cover aspect-square' />
            <button
              onClick={() => setShowVideoModal(true)}
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#00000080] flex items-center justify-center border-2 border-white cursor-pointer'
            >
              <FontAwesomeIcon icon={faPlay} className='text-white w-5 h-5 block' />
            </button>
          </div>
        )}
        {/* TitleSection */}
        <div className='w-[calc(60%-16px)] lg:w-[calc(66.66667%-16px)] ml-4 flex flex-col items-start justify-center'>
          <span className='my-1 text-xs font-semibold uppercase line-clamp-1 text-[#0c5dff]'>{topic}</span>
          <Link to={`/podcast/${slug}`} className=' text-base md:text-xl font-semibold line-clamp-3'>
            {title}
          </Link>
          {type === 'audio' && (
            <div className='w-full hidden md:block'>
              <PodcastPlayer sub url={url} />
            </div>
          )}
        </div>
        {type === 'video' && showVideoModal && (
          <div
            className='fixed w-screen h-screen inset-0 bg-[#00000080] flex items-center justify-center duration-500 z-40'
            onClick={() => setShowVideoModal(false)}
          >
            <ReactPlayer url={url} controls />
          </div>
        )}
      </div>
      {type === 'audio' && (
        <div className='w-full md:hidden'>
          <PodcastPlayer sub url={url} />
        </div>
      )}
    </div>
  );
};

export default PodcastSub;
