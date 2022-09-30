import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import slugify from 'slugify';
import 'antd/dist/antd.css';
import { notification } from 'antd';
import * as yup from 'yup';

import { db } from '../../firebase-app/firebase-config';
import { useAuth } from '../../contexts/auth-context';
import { BlogInput } from '../../components/Input/';
import { DropdownButton, NormalButton } from '../../components/Button';
import { TitleManage } from '../../components/ManageModule';
import { blogStatus } from '../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { CKEditorCustom } from '../../components/Editor/';

const initialBlog = {
  titleBlog: '',
  slugBlog: '',
  keywordBlog: '',
  imageBlog: '',
  captionImageBlog: '',
  excerptBlog: '',
  topic: '',
  contentBlog: '',
  likeCount: 0,
  commentBlog: [],
  status: blogStatus.PENDING,
};

const blogSchema = yup.object().shape({
  titleBlog: yup.string().required('Đây là thông tin bắt buộc.'),
  keywordBlog: yup.string().required('Đây là thông tin bắt buộc.'),
  imageBlog: yup.string().required('Đây là thông tin bắt buộc.'),
  topic: yup.string().required('Đây là thông tin bắt buộc.'),
  captionImageBlog: yup.string().required('Đây là thông tin bắt buộc.'),
  excerptBlog: yup.string().required('Đây là thông tin bắt buộc.'),
});

const CreateBlog = () => {
  const { userInfo } = useAuth();
  const [topic, setTopic] = useState([]);
  const [contentEditor, setContentEditor] = useState('');
  console.log('🚀 ~ file: CreateBlog.jsx ~ line 41 ~ CreateBlog ~ contentEditor', contentEditor);
  const [loading, setLoading] = useState(false);

  //get topic in db
  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, 'topic');
      const q = query(colRef, where('status', '==', 1));
      const querySnapshot = await getDocs(q);
      let resultTopic = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        resultTopic.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTopic(resultTopic);
    };
    fetchData();
  }, []);

  const handleSubmit = async (dataBlog, actions) => {
    console.log(dataBlog);
    try {
      setLoading(true);
      const dataBlogClone = { ...dataBlog };
      dataBlogClone.slugBlog = slugify(dataBlog.slugBlog || dataBlog.titleBlog, { lower: true });
      const blogRef = collection(db, 'blogs');
      const test = await addDoc(blogRef, {
        ...dataBlogClone,
        contentBlog: contentEditor,
        user: {
          id: userInfo.uid,
          displayName: userInfo.displayName,
          photoAvatar: userInfo.photoURL,
        },
        createdAt: serverTimestamp(),
      });
      notification['success']({
        message: 'Tạo bài viết mới thành công',
        description: 'Vui lòng đợi quản trị viên phê duyệt bài viết!',
      });
      actions.resetForm();
    } catch (error) {
      setLoading(false);
      notification['error']({
        message: 'Có lỗi xảy ra',
        description: 'Vui lòng thử lại sau vài phút',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=''>
      <TitleManage title='Tạo bài viết' />
      <Formik initialValues={initialBlog} onSubmit={handleSubmit} validationSchema={blogSchema}>
        {(formik) => (
          <form className='' onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-2 gap-x-2'>
              <BlogInput label='Tiêu đề' name='titleBlog' placeholder='Tạo tiêu đề bài viết' />
              <BlogInput label='Đường dẫn' name='slugBlog' placeholder='VD: vi-du-ten-tieu-de' />
              <BlogInput type='file' label='Ảnh bìa' name='imageBlog' placeholder='Lựa chọn một ảnh bìa.' />
              <BlogInput label='Chú thích ảnh bìa' name='captionImageBlog' placeholder='VD: Nguồn của ảnh bìa' />
              <BlogInput label='Từ khóa' name='keywordBlog' placeholder='Công nghệ, khoa học, ... .' />
              <BlogInput label='Trích đoạn' name='excerptBlog' placeholder='Viết trích đoạn cho blog' />
              <DropdownButton
                title='Chủ đề'
                submenu={topic}
                name='topic'
                placeholder='Lựa chọn chủ đề'
                type='click'
                setValue={formik.setFieldValue}
              />
            </div>
            <div className='mt-3 min-h-[200px] flex flex-col'>
              {/* <Editor
                className='flex-1'
                title='Nội dung'
                placeholder='Soạn nội dung blog tại đây...'
                value={contentEditor}
                setValue={setContentEditor}
              /> */}
              <CKEditorCustom
                title='Nội dung'
                placeholder='Soạn nội dung blog tại đây...'
                value={contentEditor}
                setValue={setContentEditor}
              />
            </div>
            <NormalButton
              type='submit'
              title={loading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' /> : 'Tạo bài viết mới'}
              className={`p-2 mx-auto block mt-4 ${!formik.isValid ? 'opacity-50' : 'opacity-100'} ${
                loading ? 'opacity-70' : ''
              } `}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlog;
