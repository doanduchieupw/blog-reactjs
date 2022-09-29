import parse from 'html-react-parser';
import styled from 'styled-components';

const BlogContentContainer = styled.div`
  p,
  li {
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
  a {
    color: #3172d8;
    font-family: Merriweather;
    font-size: 18px;
    line-height: 32px;
  }

  h2 {
    color: #292929;
    font-size: 24px;
    line-height: 30px;
    font-weight: 600;
    padding: 0 16px;
    margin-bottom: 16px;
  }

  ul {
    padding: 0 16px 0 40px;
    margin-bottom: 32px;
    list-style: disc;
    li {
      padding: 0;
    }
  }
  figure {
    img {
      max-width: 567px;
      width: 100%;
    }

    figcaption {
      margin: 8px 16px 32px;
    }
  }

  @media (min-width: 576px) {
    p {
      padding: 0;
    }
  }
`;
const BlogContent = ({ content }) => {
  return <BlogContentContainer className=''>{parse(content)}</BlogContentContainer>;
};

export default BlogContent;
