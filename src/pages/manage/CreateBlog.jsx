import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase-app/firebase-config';
import { BlogInput } from '../../components/Input/';
import { Editor } from '../../components/Editor';
import DropdownButton from '../../components/Button/DropdownButton';
import { async } from '@firebase/util';

const storage = getStorage();
const initialBlog = {
  titleBlog: '',
  slugBlog: '',
  keywordBlog: '',
  imageBlog: '',
  topic: '',
};
const CreateBlog = () => {
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

  // const handleUploadImage = async (file) => {
  //   if (!file) return;
  //   return new Promise(function (resolve, reject) {
  //     const storageRef = ref(storage, 'images/' + file.name);
  //     const uploadTask = uploadBytesResumable(storageRef, file);
  //     uploadTask.on(
  //       'state_changed',
  //       (snapshot) => {
  //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log('Upload is ' + progress + '% done');
  //         setLoadProgress(progress);
  //         switch (snapshot.state) {
  //           case 'paused':
  //             console.log('Upload is paused');
  //             break;
  //           case 'running':
  //             console.log('Upload is running');
  //             break;
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //         reject();
  //       },
  //       () => {
  //         // Upload completed successfully, now we can get the download URL
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           console.log('File available at', downloadURL);
  //           actions.setFieldValue('imageBlog', downloadURL);
  //           resolve(downloadURL);
  //         });
  //       }
  //     );
  //   });
  // };

  const handleBlogDB = async () => {};

  const handleSubmit = async (dataBlog, actions) => {
    console.log(dataBlog);
  };
  return (
    <div className=''>
      <div className='pb-2 border-b border-lightest-gray'>
        <h3 className='text-2xl font-semibold uppercase'>Tạo bài viết</h3>
      </div>
      <Formik initialValues={initialBlog} onSubmit={handleSubmit}>
        {(formik) => (
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
              />
            </div>
            <Editor
              className='mt-3'
              title='Nội dung'
              placeholder='Soạn nội dung blog tại đây...'
              value={contentEditor}
              setValue={setContentEditor}
            />
            <button type='submit'>OK</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlog;
