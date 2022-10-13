import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { addDoc, collection, getDoc, getDocs, query, serverTimestamp, where, doc, updateDoc } from 'firebase/firestore';
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
import { useParams } from 'react-router-dom';

const initialBlog = {
  titleBlog: '',
  slugBlog: '',
  keywordBlog: '',
  imageBlog: '',
  captionImageBlog: '',
  excerptBlog: '',
  topic: '',
  contentBlog: '',
  like: {
    count: 0,
    user: [],
  },
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
  const { blogID } = useParams();
  const [topic, setTopic] = useState([]);
  const [contentEditor, setContentEditor] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = 'TechEBlog | Chỉnh sửa bào viết';
  }, []);
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
        contentBlog: contentEditor,
        updatedAt: serverTimestamp(),
      });
      notification['success']({
        message: 'Thành công',
        description: 'Cập nhật bài viết thành công!',
      });
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
      <TitleManage title='Cập nhật bài viết' />
      <Formik initialValues={initialBlog} onSubmit={handleSubmit} validationSchema={blogSchema}>
        {(formik) => {
          useEffect(() => {
            const fetchData = async () => {
              try {
                const blogRef = doc(db, 'blogs', blogID);
                const blogQuery = await getDoc(blogRef);
                formik.resetForm({
                  values: {
                    ...blogQuery.data(),
                  },
                });
                setContentEditor(blogQuery.data().contentBlog);
              } catch (err) {
                console.log(err);
              }
            };
            fetchData();
          }, []);
          return (
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
                <CKEditorCustom
                  title='Nội dung'
                  placeholder='Soạn nội dung blog tại đây...'
                  value={contentEditor}
                  setValue={setContentEditor}
                />
              </div>
              <NormalButton
                type='submit'
                title={loading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' /> : 'Cập nhật bài viết'}
                className={`p-2 mx-auto block mt-4 ${loading ? 'opacity-70' : ''} `}
              />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateBlog;
