import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import styled from 'styled-components';
// ClassicEditor.defaultConfig = {
//   toolbar: ['fontfamily'],
// };

const CKEditorContainer = styled.div`
  .ck {
    .ck-sticky-panel .ck-sticky-panel__content_sticky {
      position: fixed;
      top: 56px;
      z-index: 150;
    }
    .ck-toolbar {
      border-top-left-radius: 4px !important;
      border-top-right-radius: 4px !important;
    }
    .ck-content {
      border-bottom-left-radius: 4px !important;
      border-bottom-right-radius: 4px !important;
      min-height: 200px;
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
    }
  }
`;

const uploadAdapter = (loader) => ({
  upload: async () => {
    try {
      const formData = new FormData();
      const file = await loader.file;
      formData.append('image', file);
      const imgURL = await axios.post(`https://api.imgbb.com/1/upload?key=ba3c30c5e82434be56b4cece81e66674`, formData);
      return { default: imgURL?.data?.data?.display_url };
    } catch (err) {
      console.log(err);
    }
  },
});

const CKEditorCustom = ({ title, placeholder, value, setValue }) => {
  return (
    <CKEditorContainer>
      <h3 className='font-semibold mb-2'>{title}</h3>
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder,
          mediaEmbed: { previewsInData: true },
        }}
        data={value}
        onReady={(editor) => {
          editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
          };
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue(data);
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
    </CKEditorContainer>
  );
};

export default CKEditorCustom;
