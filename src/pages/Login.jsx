import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FacebookIcon, GoogleIcon } from '../assets/icons';
import { BorderButton, HoverButton } from '../components/Button';
import { LoginModal } from '../components/FormModal';

const Login = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleCancel = () => {
    setShowLoginModal(false);
  };
  useEffect(() => {
    document.title = 'TechEBlog | Đăng nhập';
  }, []);
  return (
    <div className='max-w-xl md:max-w-md h-full mx-auto flex flex-col items-center justify-center'>
      <span className='w-64 md:w-80 sm:w-80 text-center text-[32px] leading-10 tracking-tight font-semibold -mt-4 mb-8'>
        Đăng nhập
        <br />
        trên TechEBlog
      </span>

      <BorderButton title='TIẾP TỤC VỚI GOOGLE' icon={<GoogleIcon />} />
      <BorderButton title='TIẾP TỤC VỚI FACEBOOK' icon={<FacebookIcon />} />
      <BorderButton
        title='TIẾP TỤC VỚI EMAIL'
        icon={<FontAwesomeIcon icon={faEnvelope} fontSize='24px' />}
        onClick={() => setShowLoginModal(true)}
      />

      <div className='mt-8 flex items-center'>
        <span className='text-[14px] text-light-gray-font leading-7'>Bạn chưa có tài khoản?</span>
        <HoverButton to='/dang-ky' title='TẠO TÀI KHOẢN' />
      </div>

      {/*========== Modal Login ==========*/}
      <div className='login-modal'>
        <Modal
          visible={showLoginModal}
          onCancel={handleCancel}
          centered
          bodyStyle={{ minHeight: '100vh', padding: '0px' }}
          width='100%'
          closable={false}
          footer={null}
          // footer={[<div onClick={() => setStep(step + 1)}>Next</div>]}
        >
          <LoginModal onCancel={handleCancel} />
          {/* {stepPage[step]} */}
        </Modal>
      </div>
    </div>
  );
};

export default Login;
