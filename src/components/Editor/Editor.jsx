import React from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';

export const Editor = ({ title, value, setValue, ...props }) => {
  return (
    <div {...props}>
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
    </div>
  );
};

export default Editor;
