import InputEmoji from 'react-input-emoji';
import { Editor } from '../Editor';

const handleOnEnter = (text) => {
  console.log('🚀 ~ file: CommentEditor.jsx ~ line 4 ~ text', text);
};
const CommentEditor = ({ value, setValue }) => <Editor />;

export default CommentEditor;
