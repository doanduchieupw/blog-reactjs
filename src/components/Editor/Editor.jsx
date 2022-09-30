import React from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const EditorContainer = styled.div`
  flex: 1;
  #toolbar {
    border-radius: 0 0 4px 4px;
    background-color: #fafafa;
  }
  .ql-container.ql-snow {
    border: transparent;
    border-radius: 4px 4px 0 0;
    .ql-editor {
      border-radius: 0 0 4px 4px;
      background-color: #fafafa;
    }
    .ql-editor.ql-blank::before {
      font-family: 'Inter';
      font-style: normal;
      font-size: 16px;
    }
  }
  .ql-snow.ql-toolbar {
    border: transparent;
    border-top: 1px solid #ccc;
    ::after {
      content: none;
    }
  }

  p {
    color: #454647;
    font-family: 'Inter';
    font-size: 16px;
  }
  strong {
    font-weight: bold;
  }
  blockquote {
    color: #454647;
    font-family: 'Inter';
    font-size: 16px;
  }
  pre {
    color: #454647;
  }
`;

export const Editor = ({ value, setValue, ...props }) => {
  return (
    <EditorContainer {...props}>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={setValue}
        placeholder={props?.placeholder}
        modules={modules}
        formats={formats}
      />
      <EditorToolbar />
    </EditorContainer>
  );
};

export default Editor;
