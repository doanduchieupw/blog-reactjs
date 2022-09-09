import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { FacebookIcon, GoogleIcon } from '../assets/icons';
import { BorderButton, HoverButton } from '../components/Button';
import { SignUpModal, ChoiceHobby } from '../components/FormModal';

const SignUp = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [step, setStep] = useState(0);
  const handleCancel = () => {
    setShowSignUpModal(false);
  };
  const stepPage = [<SignUpModal onCancel={handleCancel} />, <ChoiceHobby />, <div>content3</div>];
  return (
    <div className='max-w-xl md:max-w-md h-full mx-auto flex flex-col items-center justify-center'>
      {/*========== Title ==========*/}
      <span className='w-64 md:w-80 sm:w-80 text-center text-[32px] leading-10 font-semibold text-black -mt-4 mb-8'>
        Tạo tài khoản
        <br />
        trên TechEBlog
      </span>

      {/*========== SignUp Method ==========*/}
      <BorderButton title='ĐĂNG KÝ VỚI GOOGLE' icon={<GoogleIcon />} />
      <BorderButton title='ĐĂNG KÝ VỚI FACEBOOK' icon={<FacebookIcon />} />
      <BorderButton
        title='ĐĂNG KÝ VỚI EMAIL'
        icon={<FontAwesomeIcon icon={faEnvelope} fontSize='24px' />}
        onClick={() => setShowSignUpModal(true)}
      />

      {/*========== Footer ==========*/}
      <div className='mt-8 flex items-center'>
        <span className='text-[14px] text-light-gray-font leading-7'>Bạn đã có tài khoản?</span>
        <HoverButton to='/signup' title='ĐĂNG NHẬP' />
      </div>
      <div className='text-xs text-light-gray-font flex flex-col items-center mt-6 leading-4'>
        <span>Bằng việc tạo tài khoản, bạn đã đồng ý với các</span>
        <span>
          <Link to='/thoa-thuan-nguoi-dung' className='underline text-gray-font font-semibold'>
            THỎA THUẬN NGƯỜI DÙNG
          </Link>{' '}
          &{' '}
          <Link to='/chinh-sach-bao-mat' className='underline text-gray-font font-semibold'>
            CHÍNH SÁCH BẢO MẬT
          </Link>{' '}
          của TechEBlog
        </span>
      </div>

      {/*========== Modal SignUp ==========*/}
      <div className='signup-modal'>
        <Modal
          visible={showSignUpModal}
          onCancel={handleCancel}
          centered
          bodyStyle={{ minHeight: '100vh', padding: '0px' }}
          width='100%'
          closable={false}
          footer={null}
          // footer={[<div onClick={() => setStep(step + 1)}>Next</div>]}
        >
          <SignUpModal onCancel={handleCancel} />
          {/* {stepPage[step]} */}
        </Modal>
      </div>
    </div>
  );
};

export default SignUp;
