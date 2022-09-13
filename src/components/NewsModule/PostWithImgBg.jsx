import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostWithImgBgContainer = styled.div`
  .filter-container {
    background: linear-gradient(rgba(0, 0, 0, 0) 40%, rgb(0, 0, 0) 80%);
  }
`;

const PostWithImgBg = ({srcImg}) => {
  return (
    <PostWithImgBgContainer className='relative'>
      <Link to='/'>
        <img src={srcImg} alt='' 
        className='rounded-lg'/>
        <div className='filter-container absolute bottom-0 opacity-90 w-full h-full rounded-lg'></div>
      </Link>
    </PostWithImgBgContainer>
  );
};

export default PostWithImgBg;
