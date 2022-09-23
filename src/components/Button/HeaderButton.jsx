import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase-app/firebase-config';

// logout
const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};

const HeaderButton = ({ title, icon, to, ...props }) => {
  return (
    <Link
      to={to || '/'}
      onClick={() => {
        if(title === 'Đăng xuất') {
          handleLogout()
        }
      }}
      {...props}
      className="flex items-center justify-start px-6 py-4 text-gray-submenu-font hover:text-white hover:bg-primary-bg cursor-pointer duration-200"
    >
      <span className="p-1">{icon}</span>
      <span className="ml-2">{title}</span>
    </Link>
  );
};

export default HeaderButton;
