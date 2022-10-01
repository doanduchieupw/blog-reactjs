import parse from 'html-react-parser';
import styled from 'styled-components';

const BlogContentContainer = styled.div`
  p,
  li,
  h2,
  h3 {
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

    strong {
      color: #292929;
      display: inline;
      font-family: Merriweather;
      font-weight: 600;
      line-height: 22px;
    }
  }
  a {
    color: #3172d8;
    font-family: Merriweather;
    font-size: 18px;
    line-height: 32px;
  }

  h2 {
    font-size: 24px;
    line-height: 30px;
    font-weight: 600;
    padding: 0 16px;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 20px;
    line-height: 28px;
    padding: 0;
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
      color: #757575;
      font-family: Merriweather;
      font-size: 14px;
      font-style: normal;
      font-weight: 300;
      line-height: 24px;
    }
  }
  .media {
    padding: 0 16px;
    margin-bottom: 20px;
    max-width: 568px;
    width: 100%;
  }

  @media (min-width: 576px) {
    max-width: 540px;
    margin: 0 auto;
    p,
    h2,
    .media {
      padding: 0;
    }
  }
  @media (min-width: 1000px) {
    max-width: none;
    p {
      margin: 0 auto 20px;
      max-width: 568px;
      width: 100%;
    }
    h2,
    h3 {
      margin: 0 auto 16px;
      max-width: 568px;
      font-size: 32px;
      font-weight: 600;
      line-height: 44px;
    }
    h3 {
      font-size: 24px;
      line-height: 32px;
    }
    ul {
      margin: 0 auto 32px;
      max-width: 568px;
    }
    figure {
      img,
      figcaption {
        max-width: 768px;
        width: 100%;
        margin: auto;
      }
      figcaption {
        margin: 8px auto 32px;
      }
    }
    .media {
      max-width: 568px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;
const BlogContent = ({ content }) => {
  return <BlogContentContainer className=''>{parse(content)}</BlogContentContainer>;
};

export default BlogContent;
