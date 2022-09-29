import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import slugify from 'slugify';
import 'antd/dist/antd.css';
import { notification } from 'antd';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

import { db } from '../../firebase-app/firebase-config';
import { useAuth } from '../../contexts/auth-context';
import { BlogInput } from '../../components/Input/';
// import { Editor } from '../../components/Editor';
import { DropdownButton, NormalButton } from '../../components/Button';
import { TitleManage } from '../../components/ManageModule';
import { blogStatus } from '../../utils/constants';

const initialBlog = {
  titleBlog: '',
  slugBlog: '',
  keywordBlog: '',
  imageBlog: '',
  topic: '',
  contentBlog: '',
  status: blogStatus.PENDING,
};

const blogSchema = yup.object().shape({
  titleBlog: yup.string().required('Đây là thông tin bắt buộc.'),
  keywordBlog: yup.string().required('Đây là thông tin bắt buộc.'),
  imageBlog: yup.string().required('Đây là thông tin bắt buộc.'),
  topic: yup.string().required('Đây là thông tin bắt buộc.'),
});

const UpdateBlog = () => {
  const { userInfo } = useAuth();
  const { blogID } = useParams();
  const [topic, setTopic] = useState([]);
  const [contentEditor, setContentEditor] = useState('');
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
    try {
      setLoading(true);
      const dataBlogClone = { ...dataBlog };
      dataBlogClone.slugBlog = slugify(dataBlog.slugBlog || dataBlog.titleBlog, { lower: true });
      const blogRef = doc(db, 'blogs', blogID);
      const test = await updateDoc(blogRef, {
        ...dataBlogClone,
        updatedAt: serverTimestamp(),
      });
      actions.resetForm({
        values: {
          ...dataBlogClone,
        },
      });
      notification['success']({
        message: 'Thành công',
        description: 'Cập nhật bài viết thành công!',
      });
    } catch (error) {
      console.log('🚀 ~ file: UpdateBlog.jsx ~ line 91 ~ handleSubmit ~ error', error);
      setLoading(false);
      notification['error']({
        message: 'Có lỗi',
        description: 'Có lỗi xảy ra',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=''>
      <TitleManage title='Cập nhật bài viết' />
      <Formik initialValues={initialBlog} onSubmit={handleSubmit} validationSchema={blogSchema}>
        {(formik) => {
          useEffect(() => {
            const fetchData = async () => {
              const blogRef = doc(db, 'blogs', blogID);
              const blogQuery = await getDoc(blogRef);
              console.log('🚀 ~ file: UpdateBlog.jsx ~ line 122 ~ fetchData ~ blogQuery', blogQuery.data());
              formik.resetForm({
                values: {
                  ...blogQuery.data(),
                },
              });
            };
            fetchData();
          }, []);
          return (
            <form className='' onSubmit={formik.handleSubmit}>
              <div className='grid grid-cols-2 gap-x-2'>
                <BlogInput label='Tiêu đề' name='titleBlog' placeholder='Tạo tiêu đề bài viết' />
                <BlogInput label='Đường dẫn' name='slugBlog' placeholder='VD: vi-du-ten-tieu-de' />
                <BlogInput type='file' label='Ảnh bìa' name='imageBlog' placeholder='Lựa chọn một ảnh bìa.' />
                <BlogInput label='Từ khóa' name='keywordBlog' placeholder='Công nghệ, khoa học, ... .' />
                <DropdownButton
                  title='Chủ đề'
                  submenu={topic}
                  name='topic'
                  placeholder='Lựa chọn chủ đề'
                  type='click'
                  setValue={formik.setFieldValue}
                  value={formik.values.topic}
                />
              </div>
              {/* <div className="mt-3 min-h-[200px] flex flex-col">
                <Editor
                  className="flex-1"
                  title="Nội dung"
                  placeholder="Soạn nội dung blog tại đây..."
                  value={contentEditor}
                  setValue={setContentEditor}
                />
              </div> */}
              <NormalButton
                type='submit'
                title={loading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' /> : 'Cập nhật bài viết'}
                className={`p-2 mx-auto block mt-4 ${!formik.isValid ? 'opacity-50' : 'opacity-100'} ${
                  loading ? 'opacity-70' : ''
                } `}
              />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateBlog;
