import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase-app/firebase-config';
import { BlogInput } from '../../components/Input/';
import { Editor } from '../../components/Editor';

const storage = getStorage();
const initialBlog = {
  titleBlog: '',
  slugBlog: '',
  keywordBlog: '',
  imageBlog: '',
};
const CreateBlog = () => {
  const [loadProcess, setLoadProgress] = useState();
  const [value, setValue] = useState('');

  //get topic in db
  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, 'topic');
      const q = query(colRef, where('status', '==', 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        result.push({
          id: doc.id,
          ...doc.data(),
        });
        console.log("🚀 ~ file: CreateBlog.jsx ~ line 39 ~ fetchData ~ result", result)
      });
      
    };
    fetchData();
  }, []);

  const handleUploadImage = (file, actions, values) => {
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setLoadProgress(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            actions.setFieldValue('imageBlog', downloadURL);
          })
          .then(() => console.log(values));
      }
    );
  };

  const handleSubmit = async (values, actions) => {
    handleUploadImage(values.imageBlog, actions, values);
  };
  return (
    <div className="">
      <div className="pb-2 border-b border-lightest-gray">
        <h3 className="text-2xl font-semibold uppercase">Tạo bài viết</h3>
      </div>
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
                progress={loadProcess}
              />
              <BlogInput
                label="Từ khóa"
                name="keywordBlog"
                placeholder="Công nghệ, khoa học, ... ."
              />
            </div>
            <Editor
              className="mt-3"
              title="Nội dung"
              placeholder="Soạn nội dung blog tại đây..."
              value={value}
              setValue={setValue}
            />
            <button type="submit">OK</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlog;
