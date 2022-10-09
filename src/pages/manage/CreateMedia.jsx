import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { notification } from 'antd';
import slugify from 'slugify';
import { useAuth } from '../../contexts/auth-context';
import { db } from '../../firebase-app/firebase-config';
import { DropdownButton, NormalButton } from '../../components/Button';
import { CKEditorCustom } from '../../components/Editor';
import { BlogInput as MediaInput } from '../../components/Input';
import { TitleManage } from '../../components/ManageModule';

const initialMedia = {
  title: '',
  type: '',
  topic: '',
  image: '',
  slug: '',
  link: '',
  keyword: '',
  like: {
    count: 0,
    user: [],
  },
  length: 0,
  status: 1,
};
const podcastSchema = yup.object().shape({
  title: yup.string().required('Đây là thông tin bắt buộc.'),
  type: yup.string().required('Đây là thông tin bắt buộc.'),
  topic: yup.string().required('Đây là thông tin bắt buộc.'),
  image: yup.string().required('Đây là thông tin bắt buộc.'),
  link: yup.string().required('Đây là thông tin bắt buộc.'),
  keyword: yup.string().required('Đây là thông tin bắt buộc.'),
});

function CreateMedia() {
  const { userInfo } = useAuth();
  const [topic, setTopic] = useState([]);
  const [contentEditor, setContentEditor] = useState('');

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

  const handleSubmit = async (values, actions) => {
    try {
      const clonePodcast = { ...values };
      clonePodcast.slug = slugify(values.slug || values.title, { lower: true });
      const podcastRef = collection(db, 'podcasts');
      await addDoc(podcastRef, {
        ...clonePodcast,
        desc: contentEditor,
        user: {
          id: userInfo.uid,
          displayName: userInfo.displayName,
          photoAvatar: userInfo.photoURL,
        },
        createdAt: serverTimestamp(),
      });
      notification['success']({
        message: 'Tạo podcast mới thành công',
        description: 'Vui lòng đợi quản trị viên phê duyệt bài viết!',
      });
      actions.resetForm();
      setContentEditor('');
      actions.resetForm();
    } catch (err) {
      notification['error']({
        message: 'Có lỗi xảy ra',
        description: 'Vui lòng thử lại sau vài phút',
      });
    }
  };
  return (
    <div className='min-h-[75vh]'>
      <TitleManage title='Tạo podcast' />
      <Formik initialValues={initialMedia} onSubmit={handleSubmit} validationSchema={podcastSchema}>
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-2 gap-x-2'>
              <MediaInput label='Tên chủ đề' name='title' placeholder='Thêm chủ đề mới' />
              <MediaInput label='Đường dẫn' name='slug' placeholder='VD: vi-du-ten-tieu-de' />
              <MediaInput type='file' label='Ảnh bìa' name='image' placeholder='Lựa chọn một ảnh bìa.' />
              <MediaInput type='radio' label='Định dạng' name='type' choice={['audio', 'video']} />
              <DropdownButton
                title='Chủ đề'
                submenu={topic}
                name='topic'
                placeholder='Lựa chọn chủ đề'
                type='click'
                setValue={formik.setFieldValue}
              />
              <MediaInput label='Đường dẫn file podcast' name='link' placeholder='Nhập đường dẫn file podcast' />
              <MediaInput label='Từ khóa' name='keyword' placeholder='VD: #Đam mê #Nhiệt huyết' />
            </div>
            <div className='my-3 min-h-[200px] flex flex-col '>
              <CKEditorCustom
                title='Nội dung'
                placeholder='Soạn nội dung podcast tại đây...'
                value={contentEditor}
                setValue={setContentEditor}
              />
            </div>
            <div className='flex justify-center'>
              <NormalButton type='submit' title='Tạo podcast' className='py-2' />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateMedia;
