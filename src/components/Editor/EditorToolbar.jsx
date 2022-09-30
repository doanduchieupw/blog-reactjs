import React from 'react';
import { Quill } from 'react-quill';
import quillEmoji from 'react-quill-emoji';
import 'react-quill-emoji/dist/quill-emoji.css';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust', 'html', 'css'],
});

Quill.register(
  {
    'formats/emoji': quillEmoji.EmojiBlot,
    'modules/emoji-toolbar': quillEmoji.ToolbarEmoji,
    'modules/emoji-textarea': quillEmoji.TextAreaEmoji,
    'modules/emoji-shortname': quillEmoji.ShortNameEmoji,
  },
  true
);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      link: function (value) {
        if (value) {
          var href = prompt('Enter the URL');
          this.quill.format('link', href);
        } else {
          this.quill.format('link', false);
        }
      },
    },
  },
  'emoji-toolbar': true,
  'emoji-shortname': true,
  syntax: {
    highlight: (text) => {
      console.log(text);
      return hljs.highlightAuto(text).value;
    },
  },
};

// Formats objects for setting up the Quill editor
export const formats = ['bold', 'italic', 'underline', 'blockquote', 'link', 'code-block', 'emoji'];

// Quill Toolbar component
export const QuillToolbar = () => (
  <div id='toolbar' className='flex justify-between'>
    <div className='flex'>
      <span className='ql-formats'>
        <button className='ql-emoji'></button>
      </span>
    </div>
    <div className='flex'>
      <span className='ql-formats'>
        <button className='ql-bold' />
        <button className='ql-italic' />
        <button className='ql-underline' />
        <button className='ql-link' />
        <button className='ql-blockquote' />
        <button className='ql-code-block' />
      </span>
    </div>
  </div>
);

export default QuillToolbar;
