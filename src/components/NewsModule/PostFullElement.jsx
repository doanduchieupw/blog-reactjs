import { Link } from 'react-router-dom';
import { useBookmark, useTopic } from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

const PostFullElement = ({ blogID, topic, title, image, authorName, createdAt, avatar, slug }) => {
  const [isBookMark, setIsBookMark, handleBookmark] = useBookmark(blogID);
  const [topicField, setTopicField] = useTopic(topic);
  return (
    <div className='w-full md:w-[calc(50%-32px)] xl:w-[calc(25%-32px)] mt-6 md:mx-4 md:flex md:flex-col md:justify-between'>
      {topicField && (
        <div className='flex flex-row-reverse lg:flex-col items-center justify-between'>
          <Link
            to={`/vn/${slug}`}
            className='w-full h-full flex-[0_0_40%] xs:flex-[0_0_30%] ml-3 xs:ml-6 lg:ml-0 md:flex md:items-center mb-2'
          >
            <img src={image} className='w-full h-auto aspect-video rounded-lg' />
          </Link>
          <div className='w-full'>
            <Link
              to={`/chu-de/${topicField.slug}`}
              className='mb-1.5 lg:mt-6 lg:mb-2 text-xs uppercase font-semibold text-[#0c5dff]'
            >
              {topic}
            </Link>
            <Link
              to={`/vn/${slug}`}
              className='mb-2 lg:mb-4 md:min-h-[84px] text-base xs:text-xl text-gray-font line-clamp-3 font-semibold'
            >
              {title}
            </Link>
          </div>
        </div>
      )}
      <div className='flex items-center justify-between'>
        <div className='flex justify-start'>
          <img src={avatar} className='w-8 h-8 rounded-full object-cover mr-3' />
          <div className='flex flex-row-reverse lg:flex-col items-center lg:items-start justify-start lg:justify-center'>
            <span className='text-xs font-semibold track-[0.01em] text-[#555]'>{authorName}</span>
            <p className='flex justify-start items-center after:content-[""] after:block after:w-0.5 after:h-0.5 after:mx-2 after:bg-light-gray-font lg:after:hidden text-xs text-light-gray-font whitespace-nowrap tracking-[0.005em]'>
              {`${createdAt.replace('khoảng', '')} trước`}
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            handleBookmark();
            e.preventDefault();
          }}
        >
          {isBookMark ? (
            <FontAwesomeIcon icon={fasBookmark} className='block w-5 h-5 text-green-font' />
          ) : (
            <FontAwesomeIcon icon={farBookmark} className='block w-5 h-5 ' />
          )}
        </button>
      </div>
    </div>
  );
};

export default PostFullElement;
