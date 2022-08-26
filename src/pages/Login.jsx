import { BorderButton, HoverButton } from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FacebookIcon, GoogleIcon } from '../assets/icons';

const Login = () => {
    return (
        <div className='max-w-xl md:max-w-md h-full mx-auto flex flex-col items-center justify-center'>
            <span className='w-64 md:w-80 sm:w-80 text-center text-[32px] leading-10 tracking-tight font-semibold -mt-4 mb-8'>
                Đăng nhập
                <br />
                trên TechEBlog
            </span>
            
            <BorderButton
                title='TIẾP TỤC VỚI GOOGLE'
                icon={<GoogleIcon />}
            />
            <BorderButton
                title='TIẾP TỤC VỚI FACEBOOK'
                icon={<FacebookIcon />}
            />
            <BorderButton
                title='TIẾP TỤC VỚI EMAIL'
                icon={<FontAwesomeIcon icon={faEnvelope} fontSize='24px'/>}
            />

            <div className='mt-8 flex items-center'>
                <span className='text-[14px] text-light-gray-font leading-7'>Bạn chưa có tài khoản?</span>
                <HoverButton to='/signup' title='TẠO TÀI KHOẢN'/>
            </div>
        </div>
    );
};

export default Login;
