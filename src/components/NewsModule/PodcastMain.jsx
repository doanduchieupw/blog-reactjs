import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PodcastPlayer from './PodcastPlayer';
import ReactPlayer from 'react-player/youtube';

const PodcastMain = ({ image, url, topic, title, slug, type }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  return (
    <div className='relative w-full lg:w-1/2 flex flex-col items-center lg:items-start mb-4'>
      {type === 'audio' && (
        <Link to={`/podcast/${slug}`} className='max-w-md mb-8'>
          <img src={image} className='rounded-2xl shadow-2xl' />
        </Link>
      )}
      {type === 'video' && (
        <div className='relative max-w-md mb-8 '>
          <img src={image} className='rounded-2xl shadow-2xl' />
          <button
            onClick={() => setShowVideoModal(true)}
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#00000080] flex items-center justify-center border-2 border-white cursor-pointer'
          >
            <FontAwesomeIcon icon={faPlay} className='text-white w-5 h-5 block' />
          </button>
        </div>
      )}
      <div className='w-full max-w-md flex flex-col items-start '>
        <span className='my-1 text-xs font-semibold uppercase line-clamp-1 text-[#0c5dff]'>{topic}</span>
        <Link to={`/podcast/${slug}`} className='my-2.5 text-2xl font-semibold line-clamp-3'>
          {title}
        </Link>
      </div>
      {type === 'audio' && (
        <div className='w-full max-w-md'>
          <PodcastPlayer url={url} />
        </div>
      )}
      {type === 'video' && showVideoModal && (
        <div
          className='fixed w-screen h-screen inset-0 bg-[#00000080] flex items-center justify-center duration-500 z-40'
          onClick={() => setShowVideoModal(false)}
        >
          <ReactPlayer url={url} controls />
        </div>
      )}
    </div>
  );
};

export default PodcastMain;
