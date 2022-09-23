import { Formik } from 'formik';
import { useState } from 'react';
import { NormalButton } from '../../components/Button';
import { BlogInput } from '../../components/Input';
import { TitleManage } from '../../components/ManageModule';
import { useAuth } from '../../contexts/auth-context';

const initialUser = {
  fullname: '',
  description: '',
};

const handleSubmit = () => {

}
const SettingUser = () => {
  const { userInfo } = useAuth();
  const [isEdit, setEdit] = useState(false);
  console.log("🚀 ~ file: SettingUser.jsx ~ line 19 ~ SettingUser ~ isEdit", isEdit)
  return (
    <div>
      <TitleManage title="Thông tin tài khoản" />

      <Formik initialValues={initialUser} onSubmit={handleSubmit}>
        {(formik) => (
         <>
            <NormalButton title={`${isEdit ? 'Sửa' : 'OK' }`} onClick={() => setEdit(!isEdit)}/>
            <div className="flex w-full mt-8">
              <div className="w-1/4 flex justify-center">
                <img
                  src={userInfo.photoURL}
                  alt={userInfo.displayName}
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
              <div className="w-3/4 flex flex-col items-start">
                <p className="text-[32px] text-primary-bg font-semibold leading-[1.75em]">
                  {userInfo.displayName}
                </p>
                <p className="text-sm text-gray-submenu-font mt-2 mb-[20px]">
                  Thành viên
                </p>
                <BlogInput
                  name="description"
                  placeholder="Giới thiệu về bản thân"
                  disabled={isEdit ? false : true }
                  className='min-h-[100px]'
                ></BlogInput>
              </div>
            </div>
         </>
        )}
      </Formik>
    </div>
  );
};

export default SettingUser;
