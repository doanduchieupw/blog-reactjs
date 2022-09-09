import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleXmark, faAngleLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import BorderInput from '../Input/BorderInput';
import { ConfirmButton } from '../Button';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase-app/firebase-config';
import { useNavigate } from 'react-router-dom';

const initialLogin = {
  email: '',
  password: '',
};

const loginSchema = yup.object().shape({
  email: yup.string().email('Email chưa đúng').required('Email không thể để trống'),
  password: yup
    .string()
    .required('Mật khẩu không thể để trống')
    .min(6, 'Độ dài ít nhất 6 ký tự')
    .matches(RegExp('(.*\\d.*)'), 'Bao gồm ít nhất 1 chữ số')
    .matches(RegExp('(^.*[a-zA-Z]+.*$)'), 'Bao gồm ít nhất 1 ký tự chữ'),
});

const LoginModal = ({ onCancel }) => {
  const [togglePass, setTogglePass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (user, actions) => {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      await updateProfile(auth.currentUser, {
        displayName: user.fullname,
      });
      const collectionRef = collection(db, 'users');
      await addDoc(collectionRef, {
        email: user.email,
        password: user.password,
        fullname: user.fullname === '' ? 'Người mới' : user.fullname,
        dateOfBirth: user?.dateOfBirth || '1970-01-01',
      });
      navigate('/');
    } catch (err) {
      actions.setFieldError;
    }
  };

  useEffect(() => {
    document.title = "Đăng nhập | TechEBlog"
  }, [])

  return (
    <Formik
      initialValues={initialLogin}
      validationSchema={loginSchema}
      onSubmit={(user, actions) => {
        handleLogin(user);
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
            <span>Đăng nhập</span>
          </div>
          <div className='max-w-full w-[642px] p-10 flex-1'>
            <div className='w-full flex flex-col items-start'>
              <span className='w-14 h-14 mb-6 flex justify-center items-center bg-gray-bg-btn active:bg-dark-gray-bg rounded-full border font-semibold text-primary-bg cursor-pointer'>
                <FontAwesomeIcon icon={faEnvelope} fontSize='24px' />
              </span>
              <span className='text-[32px] font-semibold text-black mt-2'>Đăng nhập với Email</span>
              <span className='text-base font-normal text-gray-submenu-font mt-2'>
                Nhập địa chỉ email và mật khẩu để tiếp tục
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
                <div className='text-xs text-error-font leading-snug pl-4 mt-1.5'>
                  <ErrorMessage name='email' />
                </div>
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
                <div className='text-xs text-error-font leading-snug pl-4 mt-1.5'>
                  <ErrorMessage name='password' />
                </div>
              </Form>
            </div>
          </div>
          <div className='sticky bottom-0 h-16 w-full px-4 py-2 flex items-center justify-center bg-white border-t border-slate-200'>
            <ConfirmButton title='Đăng nhập' disabled={props.isValid} />
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginModal;
