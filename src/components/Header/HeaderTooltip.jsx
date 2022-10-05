import { useAuth } from '../../contexts/auth-context';
import { UserCard } from '../UserModule';
import { HeaderButton } from '../Button/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

const headerTooltipList = [
  {
    title: 'Thông tin tài khoản',
    icon: <FontAwesomeIcon icon={faUser} className='w-4 h-4 block' />,
    to: '/quan-ly/tao-bai-viet',
  },
  {
    title: 'Đăng xuất',
    icon: <FontAwesomeIcon icon={faArrowRightFromBracket} className='w-4 h-4 block' />,
  },
];
const HeaderTooltip = () => {
  const { userInfo } = useAuth();
  return (
    <div className='w-80 bg-white h-full text-black rounded-[4px]'>
      <UserCard avatarUrl={userInfo.photoURL} fullname={userInfo.displayName} describe='Tác giả' />
      <div className='flex flex-col mt-4'>
        {headerTooltipList.map((item, index) => (
          <HeaderButton key={index} title={item.title} icon={item.icon} to={item.to} />
        ))}
      </div>
    </div>
  );
};

export default HeaderTooltip;
