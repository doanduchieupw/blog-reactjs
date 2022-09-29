import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import styled from 'styled-components';

// ClassicEditor.defaultConfig = {
//   toolbar: ['fontfamily'],
// };

const CKEditorContainer = styled.div`
  .ck {
    .ck-toolbar {
      border-top-left-radius: 4px !important;
      border-top-right-radius: 4px !important;
    }
    .ck-content {
      border-bottom-left-radius: 4px !important;
      border-bottom-right-radius: 4px !important;
      min-height: 200px;
      h3 {
        color: red;
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
