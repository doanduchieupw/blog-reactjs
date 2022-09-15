import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Bookmark } from '../../assets/icons';

const PostWithImgBgContainer = styled.div`
  .filter-container {
    background: linear-gradient(rgba(0, 0, 0, 0) 40%, rgb(0, 0, 0) 80%);
  }
  .title {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    
  }
`;

const PostWithImgBg = ({ srcImg }) => {
  return (
    <PostWithImgBgContainer className="relative w-full xs:w-[calc(50%-4px)] h-full mb-6 xs:mb-0">
      <Link to="/">
        <img
          src={srcImg}
          alt=""
          className="rounded-lg cover object-cover aspect-video"
        />
        <div className="filter-container absolute bottom-0 opacity-90 w-full h-full rounded-lg"></div>
      </Link>
      <div className="flex flex-col w-full absolute bottom-0 px-4 pb-3">
        <div className='hidden xs:block'>
          <p className='text-xs uppercase font-semibold text-dark-gray-bg'>Xu Hướng Cuộc Sống</p>
        </div>
        <div className="flex mt-1 gap-x-2 items-center justify-between">
          <h3 className="title text-white text-base md:text-2xl font-semibold ">
            5 cách biến tấu ly cocktail của bạn theo xu hướng bền vững
          </h3>
          <button className="p-2 md:p-4 rounded-full bg-[#fff6]">
            <FontAwesomeIcon
              icon={faBookmark}
              className="text-white block w-4 h-4"
            />
          </button>
        </div>
      </div>
    </PostWithImgBgContainer>
  );
};

export default PostWithImgBg;
