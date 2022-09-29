import parse from 'html-react-parser';
import styled from 'styled-components';

const BlogContentContainer = styled.div`
  p {
    color: #292929;
    font-family: Merriweather;
    font-size: 18px;
    font-weight: 300;
    line-height: 32px;
    padding: 0 16px;
    margin-bottom: 20px;
    :has(img) {
      padding: 0;
    }
  }

  h2 {
    color: #292929;
    font-size: 24px;
    line-height: 30px;
    font-weight: 600;
    padding: 0 16px;
    margin-bottom: 16px;
  }
  img {
    max-width: 567px;
    width: 100%;
  }
  @media (min-width: 576px) {
    p {
      padding: 0;
    }
  }
`;
const BlogContent = ({ content }) => {
  return <BlogContentContainer className='w-[90%] mx-auto'>{parse(content)}</BlogContentContainer>;
};

export default BlogContent;
