import React from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const EditorContainer = styled.div`
  #toolbar {
    border-radius: 4px 4px 0 0;
  }
  .ql-container.ql-snow {
    border: 1px solid #ccc;
    border-radius: 0 0 4px 4px;
    .ql-editor {
      height: 400px;
      border-radius: 0 0 4px 4px;
    }
  }
`;

export const Editor = ({ title, value, setValue, ...props }) => {
  return (
    <EditorContainer {...props}>
      <h3 className='font-semibold mb-2'>{title}</h3>
      <EditorToolbar />
      <ReactQuill
        theme='snow'
        value={value}
        onChange={setValue}
        placeholder={props?.placeholder}
        modules={modules}
        formats={formats}
      />
    </EditorContainer>
  );
};

export default Editor;
