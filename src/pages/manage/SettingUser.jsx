import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { NormalButton } from '../../components/Button';
import { BlogInput } from '../../components/Input';
import { TitleManage } from '../../components/ManageModule';
import { useAuth } from '../../contexts/auth-context';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-app/firebase-config';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton } from 'antd';

const initialUser = {
  fullname: '',
  description: '',
  photoAvatar: '',
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};
const updateProfileSchema = yup.object().shape({
  oldPassword: yup.string().required('Đây là thông tin bắt buộc.'),
  newPassword: yup
    .string()
    .required('Đây là thông tin bắt buộc.')
    .min(6, 'Độ dài ít nhất 6 ký tự')
    .matches(RegExp('(.*\\d.*)'), 'Bao gồm ít nhất 1 chữ số')
    .matches(RegExp('(^.*[a-zA-Z]+.*$)'), 'Bao gồm ít nhất 1 ký tự chữ'),
  confirmNewPassword: yup
    .string()
    .required('Đây là thông tin bắt buộc.')
    .oneOf(
      [yup.ref('newPassword'), null],
      'Xác nhận lại mật khẩu chưa đúng. Hãy nhập lại!'
    ),
});

const handleSubmit = (values) => {
  console.log(values);
};
const SettingUser = () => {
  const { userInfo } = useAuth();
  const [isEdit, setEdit] = useState(false);

  return (
    <div>
      <TitleManage title="Thông tin tài khoản" />
      <Formik
        initialValues={initialUser}
        validationSchema={updateProfileSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          console.log(
            '🚀 ~ file: SettingUser.jsx ~ line 47 ~ SettingUser ~ formik',
            formik
          );
          useEffect(() => {
            const fetchData = async () => {
              try {
                const userRef = doc(db, 'users', userInfo.uid);
                const userSnapshot = await getDoc(userRef);
                formik.setFieldValue('fullname', userSnapshot.data().fullname);
                formik.setFieldValue('photoAvatar', userSnapshot.data().photoAvatar);
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
          return (
            <>
              <NormalButton
                title={`${isEdit ? 'OK' : 'Sửa'}`}
                onClick={() => setEdit(!isEdit)}
              />
              <div className="flex w-full mt-8">
                <div className="w-1/4 flex justify-center">
                  <div className="relative group w-32 h-32">
                    {formik.values.photoAvatar ? <img
                      src={formik.values.photoAvatar}
                      alt={userInfo.displayName}
                      className="w-full h-full object-cover rounded-full"
                    /> : <div className='w-full h-full rounded-full border-4 border-transparent border-t-gray-border animate-spin'></div>}
                    {isEdit && (
                      <label
                        htmlFor="photoAvatar"
                        className="absolute -bottom-16 w-32 h-16 rounded-b-full opacity-50 bg-slate-200 hidden group-hover:block group-hover:bottom-0 duration-500 "
                      >
                        <input
                          type="file"
                          id="photoAvatar"
                          name="photoAvatar"
                          className="hidden"
                        />
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
                  ) : (
                    formik.values.fullname ? <p className="text-[32px] text-gray-submenu-font font-semibold leading-[1.75em]">
                      {formik.values.fullname}
                    </p> : <Skeleton active rows={3} block />
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
                  error={Boolean(
                    formik?.errors?.oldPassword && formik.touched?.oldPassword
                  )}
                  autoComplete="off"
                  icon={<FontAwesomeIcon icon={faEye} />}
                />
                <BlogInput
                  name="newPassword"
                  type="password"
                  placeholder="Mật khẩu mới"
                  autocomplete="off"
                  error={Boolean(
                    formik?.errors?.newPassword && formik.touched?.newPassword
                  )}
                  icon={<FontAwesomeIcon icon={faEye} />}
                />
                <BlogInput
                  name="confirmNewPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  autocomplete="off"
                  error={Boolean(
                    formik?.errors?.confirmNewPassword &&
                      formik.touched?.confirmNewPassword
                  )}
                  icon={<FontAwesomeIcon icon={faEye} />}
                />
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default SettingUser;
