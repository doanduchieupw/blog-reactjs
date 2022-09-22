import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import slugify from 'slugify';
import 'antd/dist/antd.css';
import { notification } from 'antd';

import { db } from '../../firebase-app/firebase-config';
import { useAuth } from '../../contexts/auth-context';
import { BlogInput } from '../../components/Input/';
import { Editor } from '../../components/Editor';
import { DropdownButton } from '../../components/Button';
import { TitleManage } from '../../components/ManageModule';

const initialBlog = {
  titleBlog: '',
  slugBlog: '',
  keywordBlog: '',
  imageBlog: '',
  topic: '',
  contentBlog: '',
};
const CreateBlog = () => {
  const { userInfo } = useAuth();
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
      dataBlogClone.slugBlog = slugify(dataBlog.slugBlog || dataBlog.titleBlog , {lower: true});
      const blogRef = collection(db, 'blogs');
      const test = await addDoc(blogRef, {
        ...dataBlogClone,
        userId: userInfo.uid,
      });
      notification['success']({
        message: 'Tạo bài viết mới thành công',
        description:
          'Vui lòng đợi quản trị viên phê duyệt bài viết!',
      });
      actions.resetForm();
      
    } catch (error) {
      setLoading(false);
      notification['error']({
        message: 'Tạo bài viết mới thành công',
        description:
          'Vui lòng đợi quản trị viên phê duyệt bài viết!',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <TitleManage title='Tạo bài viết' />
      <Formik initialValues={initialBlog} onSubmit={handleSubmit}>
        {(formik) => (
          <form className="" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-x-2">
              <BlogInput
                label="Tiêu đề"
                name="titleBlog"
                placeholder="Tạo tiêu đề bài viết"
              />
              <BlogInput
                label="Đường dẫn"
                name="slugBlog"
                placeholder="VD: vi-du-ten-tieu-de"
              />
              <BlogInput
                type="file"
                label="Ảnh bìa"
                name="imageBlog"
                placeholder="Lựa chọn một ảnh bìa."
              />
              <BlogInput
                label="Từ khóa"
                name="keywordBlog"
                placeholder="Công nghệ, khoa học, ... ."
              />
              <DropdownButton
                title="Chủ đề"
                submenu={topic}
                name="topic"
                placeholder="Lựa chọn chủ đề"
                type="click"
                setValue={formik.setFieldValue}
              />
            </div>
            <div className="mt-3 min-h-[200px] flex flex-col">
              <Editor
                className="flex-1"
                title="Nội dung"
                placeholder="Soạn nội dung blog tại đây..."
                value={contentEditor}
                setValue={setContentEditor}
              />
            </div>
            <button type="submit">OK</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlog;
