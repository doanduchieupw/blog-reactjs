import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleXmark, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form } from 'formik';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import BorderInput from '../Input/BorderInput';
import { MoreButton, ConfirmButton } from '../Button';
import CheckValidation from '../CheckValidation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase-app/firebase-config';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { userRole, userStatus } from '../../utils/constants';

const initialSignUp = {
  email: '',
  password: '',
  fullname: '',
};

const signUpSchema = yup.object().shape({
  email: yup.string().email('Email chưa đúng').required('Email không thể để trống'),
  password: yup
    .string()
    .required('Mật khẩu không thể để trống')
    .min(6, 'Độ dài ít nhất 6 ký tự')
    .matches(RegExp('(.*\\d.*)'), 'Bao gồm ít nhất 1 chữ số')
    .matches(RegExp('(^.*[a-zA-Z]+.*$)'), 'Bao gồm ít nhất 1 ký tự chữ'),
});

const SignUpModal = ({ onCancel, setStep }) => {
  const [togglePass, setTogglePass] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [errorPassword, setErrorPassword] = useState([]);
  const navigate = useNavigate();

  const handleSignUp = async (user, actions) => {
    console.log(auth);
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      await updateProfile(auth.currentUser, {
        displayName: user.fullname !== '' ? user.fullname : 'Người mới',
        photoURL: 'https://yt3.ggpht.com/ytc/AMLnZu_0iIU3NJaO3L3EMmz9hjoA9zHiUSaBCi0aAD5T6Q=s900-c-k-c0x00ffffff-no-rj',
      });
      const collectionRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(collectionRef, {
        email: user.email,
        password: user.password,
        fullname: user.fullname !== '' ? user.fullname : 'Người mới',
        dateOfBirth: user?.dateOfBirth || '1970-01-01',
        photoAvatar:
          'https://yt3.ggpht.com/ytc/AMLnZu_0iIU3NJaO3L3EMmz9hjoA9zHiUSaBCi0aAD5T6Q=s900-c-k-c0x00ffffff-no-rj',
        status: userStatus.ACTIVE,
        role: userRole.USER,
        like: [],
        folowing: [],
        folower: [],
        topic: [],
        bookmark: [],
        createdAt: serverTimestamp(),
      });
      notification['success']({
        message: 'Đăng ký thành công',
        description: 'Vui lòng vào cài đặt để tùy chỉnh lại thông tin cá nhân!',
      });
      setStep((prev) => prev + 1);
    } catch (err) {
      actions.setFieldError('email', 'Email đã tồn tại');
    }
  };

  return (
    <Formik
      initialValues={initialSignUp}
      validationSchema={signUpSchema}
      validate={(values) =>
        signUpSchema
          .validate(values, { abortEarly: false })
          .then(() => {})
          .catch((err) => {
            let errorArray = [];
            err.inner.forEach((e) => {
              if (e.path === 'password') {
                errorArray.push(e.message);
              }
            });
            setErrorPassword(errorArray);
          })
      }
      onSubmit={(user, actions) => {
        handleSignUp(user, actions);
      }}
    >
      {(props) => (
        <div className='flex flex-col items-center min-h-screen'>
          <div className='w-full h-14 sticky top-0 bg-white border-b border-b-slate-200 text-xl font-semibold flex justify-center items-center text-black'>
            <FontAwesomeIcon
              icon={faAngleLeft}
              className='absolute top-[calc(50%-10px)] left-1/4 cursor-pointer'
              onClick={onCancel}
            />
            <span>Tạo Tài Khoản</span>
          </div>
          <div className='max-w-[668px] p-2 md:p-5 lg:p-10 flex-1'>
            <div className='w-full flex flex-col items-start'>
              <span className='text-sm font-semibold text-light-gray-font uppercase'>Bước 1</span>
              <span className='text-[32px] font-semibold text-black mt-2'>Tạo tài khoản với Email</span>
              <span className='text-base font-normal text-gray-submenu-font mt-2'>
                Nhập địa chỉ email, mật khẩu và xác thực captcha để tạo tài khoản
              </span>

              <Form className='mt-3 w-full'>
                <BorderInput
                  name='email'
                  label='email'
                  placeholder='example@email.com'
                  error={Boolean(props?.errors?.email && props.touched?.email)}
                  icon={
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer'
                      onClick={() => props.setFieldValue('email', '')}
                    />
                  }
                />
                {props?.errors?.email && <CheckValidation name='email' message={props?.errors?.email} type='text' />}
                <BorderInput
                  name='password'
                  type={togglePass ? 'text' : 'password'}
                  label='mật khẩu'
                  placeholder='Ít nhất 6 ký tự'
                  error={Boolean(props?.errors?.password && props.touched?.password)}
                  icon={
                    togglePass ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer py-4 rounded-full active:bg-slate-200'
                        onClick={() => setTogglePass(false)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEye}
                        className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer py-4 rounded-full active:bg-slate-200'
                        onClick={() => setTogglePass(true)}
                      />
                    )
                  }
                  subIcon={
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer'
                      onClick={() => props.setFieldValue('password', '')}
                    />
                  }
                />
                {props?.errors?.password && props?.touched?.password && (
                  <CheckValidation message={errorPassword} type='password' />
                )}

                <div className='h-px w-full my-6 bg-slate-200 '></div>

                <MoreButton title='Thông tin bổ sung' state={showMore} onClick={() => setShowMore(!showMore)} />
                {showMore && (
                  <div className='more-information transition transform duration-200'>
                    <BorderInput
                      name='fullname'
                      label='Họ và tên'
                      placeholder='VD: Nguyễn Văn A'
                      icon={
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer'
                          onClick={() => props.setFieldValue('fullname', '')}
                        />
                      }
                    />
                    <BorderInput
                      name='dateOfBirth'
                      label='Ngày sinh'
                      placeholder='DD-MM-YYYY'
                      type='date'
                      setValue={props.setFieldValue}
                      icon={
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer'
                          onClick={() => props.setFieldValue('dateOfBirth', '')}
                        />
                      }
                    />
                  </div>
                )}
              </Form>
            </div>
          </div>
          <div className='sticky bottom-0 h-16 w-full px-4 py-2 flex items-center justify-center bg-white border-t border-slate-200'>
            <ConfirmButton title='Tạo tài khoản' disabled={props.isValid} isLoading={props.isSubmitting} />
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SignUpModal;
