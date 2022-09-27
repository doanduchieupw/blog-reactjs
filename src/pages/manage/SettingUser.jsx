import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { NormalButton } from '../../components/Button';
import { BlogInput } from '../../components/Input';
import { TitleManage } from '../../components/ManageModule';
import { useAuth } from '../../contexts/auth-context';
import { auth, db } from '../../firebase-app/firebase-config';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LineSkeleton } from '../../components/LoadingSkeleton';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { notification } from 'antd';

const initialUser = {
  fullname: '',
  description: '',
  photoAvatar: '',
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const updateProfileSchema = yup.object().shape({
  oldPassword: yup.string(),
  newPassword: yup
    .string()
    // .required('Đây là thông tin bắt buộc.')
    .min(6, 'Độ dài ít nhất 6 ký tự')
    .matches(RegExp('(.*\\d.*)'), 'Bao gồm ít nhất 1 chữ số')
    .matches(RegExp('(^.*[a-zA-Z]+.*$)'), 'Bao gồm ít nhất 1 ký tự chữ'),
  confirmNewPassword: yup
    .string()
    // .required('Đây là thông tin bắt buộc.')
    .oneOf(
      [yup.ref('newPassword'), null],
      'Xác nhận lại mật khẩu chưa đúng. Hãy nhập lại!'
    ),
});

const storage = getStorage();

const SettingUser = () => {
  const { userInfo } = useAuth();
  const [isEdit, setEdit] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const handleSubmit = async (values, actions) => {
    console.log(values);
    try {
      if (values.oldPassword === '') {
        if (
          values.photoAvatar !== userInfo.photoURL ||
          values.fullname !== userInfo.displayName
        ) {
          await updateProfile(auth.currentUser, {
            displayName: values.fullname,
            photoURL: values.photoAvatar,
          });
          const userRef = doc(db, 'users', userInfo.uid);
          await updateDoc(userRef, {
            fullname: values.fullname,
            photoAvatar: values.photoAvatar,
          });
          notification['success']({
            message: 'Thành công',
            description: 'Cập nhật thông tin thành công',
          });
        }
      } else {
        if (
          values.photoAvatar !== userInfo.photoURL ||
          values.fullname !== userInfo.displayName
        ) {
          await updateProfile(auth.currentUser, {
            displayName: values.fullname,
            photoURL: values.photoAvatar,
          });
          const userRef = doc(db, 'users', userInfo.uid);
          await updateDoc(userRef, {
            fullname: values.fullname,
            photoAvatar: values.photoAvatar,
          });
        }
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          values.oldPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, values.newPassword);
        const userRef = doc(db, 'users', userInfo.uid);
        await updateDoc(userRef, {
          password: values.newPassword,
        });
        actions.setFieldValue('oldPassword', '');
        actions.setFieldValue('newPassword', '');
        actions.setFieldValue('confirmNewPassword', '');
        notification['success']({
          message: 'Đổi mật khẩu thành công',
          description: 'Vui lòng hãy nhớ mật khẩu mới!',
        });
      }
    } catch (err) {
      console.log(
        '🚀 ~ file: SettingUser.jsx ~ line 90 ~ handleSubmit ~ err',
        err
      );
      const errorCode = err.code;
      const errorMessage = err.message;
      if (errorCode === 'auth/wrong-password') {
        actions.setFieldError(
          'oldPassword',
          'Mật khẩu cũ chưa đúng, hãy nhập lại!'
        );
      } else if (errorCode === 'auth/too-many-requests') {
        actions.setFieldError(
          'oldPassword',
          'Thử lại quá nhiều lần, vui lòng đợi'
        );
      }
      setEdit(true);
    }
  };
  return (
    <div>
      <TitleManage title="Thông tin tài khoản" />
      <Formik
        initialValues={initialUser}
        validationSchema={updateProfileSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          useEffect(() => {
            const fetchData = async () => {
              try {
                const userRef = doc(db, 'users', userInfo.uid);
                const userSnapshot = await getDoc(userRef);
                formik.setFieldValue('fullname', userSnapshot.data().fullname);
                formik.setFieldValue(
                  'photoAvatar',
                  userSnapshot.data().photoAvatar
                );
              } catch (err) {
                console.log(
                  '🚀 ~ file: SettingUser.jsx ~ line 46 ~ fetchData ~ r',
                  err
                );
              }
            };
            const fetchDataTimeoutID = setTimeout(() => fetchData(), 2000);
            return () => clearTimeout(fetchDataTimeoutID);
          }, [userInfo]);

          const handleImageSelect = (e) => {
            console.log('handleImageSelect');
            const file = e.currentTarget.files[0];
            if (!file) return;
            // setFileName(file.name);
            // const reader = new FileReader();
            // reader.readAsDataURL(file);
            // reader.onload = () => setPreviewImage(reader.result);
            handleUploadImage(file);
          };

          const handleUploadImage = (file) => {
            if (!file) return;
            const storageRef = ref(storage, 'images/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            console.log('handleUploadImage');
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setUploadPercent(Math.floor(progress));
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
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  formik.setFieldValue('photoAvatar', downloadURL);
                });
              }
            );
          };

          return (
            <form className="relative" onSubmit={formik.handleSubmit}>
              <NormalButton
                title={`${isEdit ? 'OK' : 'Sửa'}`}
                type={`${isEdit ? 'button' : 'submit'}`}
                onClick={() => setEdit(!isEdit)}
                className={`absolute -top-20 right-0 ${
                  isEdit
                    ? 'bg-transparent text-[#00773e] border border-[#00773e]'
                    : ''
                }`}
              />
              <div className="flex w-full mt-8">
                <div className="w-1/4 flex justify-center">
                  <div className="relative group w-32 h-32">
                    {formik.values.photoAvatar ? (
                      <div className="w-full h-full">
                        <img
                          src={formik.values.photoAvatar}
                          alt={userInfo.displayName}
                          className="w-full h-full object-cover rounded-full"
                        />
                        {uploadPercent > 0 && uploadPercent < 100 && (
                          <span className="text-white text-3xl font-bold absolute top-5 left-0 right-0 text-center">{`${uploadPercent} %`}</span>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-full border-4 border-transparent border-t-gray-border animate-spin"></div>
                    )}
                    {isEdit && (
                      <label
                        htmlFor="photoAvatar"
                        className="absolute -bottom-16 w-32 h-16 rounded-b-full opacity-70 bg-slate-200 hidden group-hover:block group-hover:bottom-0 duration-500 "
                      >
                        <input
                          type="file"
                          id="photoAvatar"
                          name="photoAvatar"
                          className="hidden"
                          onChange={handleImageSelect}
                        />
                        <div className="flex items-center justify-center gap-x-2 text-black h-full">
                          <span className="font-semibold">Tải ảnh</span>
                          <FontAwesomeIcon icon={faFileUpload} />
                        </div>
                      </label>
                    )}
                  </div>
                </div>
                <div className="w-3/4 flex flex-col items-start">
                  {isEdit ? (
                    <input
                      name="fullname"
                      className="text-[32px] text-primary-bg font-semibold leading-[1.75em] border-none"
                      value={formik.values.fullname}
                      onChange={formik.handleChange}
                    />
                  ) : formik.values.fullname ? (
                    <p className="text-[32px] text-gray-submenu-font font-semibold leading-[1.75em]">
                      {formik.values.fullname}
                    </p>
                  ) : (
                    <LineSkeleton className="h-14 w-1/2" />
                  )}
                  <p className="text-sm text-gray-submenu-font mt-2 mb-[20px]">
                    Thành viên
                  </p>
                  <BlogInput
                    name="description"
                    placeholder="Giới thiệu về bản thân"
                    disabled={isEdit ? false : true}
                    className="min-h-[100px]"
                  ></BlogInput>
                </div>
              </div>
              {/* Change password */}
              <TitleManage title="Đổi mật khẩu" className="mt-4" />
              <div className="w-1/2">
                <BlogInput
                  name="oldPassword"
                  type="password"
                  placeholder="Mật khẩu cũ"
                  disabled={isEdit ? false : true}
                  error={Boolean(
                    formik?.errors?.oldPassword && formik.touched?.oldPassword
                  )}
                  autoComplete="off"
                />
                <BlogInput
                  name="newPassword"
                  type="password"
                  placeholder="Mật khẩu mới"
                  disabled={isEdit ? false : true}
                  autoComplete="off"
                  error={Boolean(
                    formik?.errors?.newPassword && formik.touched?.newPassword
                  )}
                />
                <BlogInput
                  name="confirmNewPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  disabled={isEdit ? false : true}
                  autoComplete="off"
                  error={Boolean(
                    formik?.errors?.confirmNewPassword &&
                      formik.touched?.confirmNewPassword
                  )}
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SettingUser;
