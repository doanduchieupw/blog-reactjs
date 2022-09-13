import { NotFoundIcon } from '../assets/icons';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[90vh] text-primary-bg'>
      <NotFoundIcon />
      <h2 className='mt-10 mb-2 text-[32px] font-semibold '>Oops! Page not found</h2>
      <p className='mb-5 text-xs'>The page you’re looking for doesn’t exist</p>
      <Link to='/' className='bg-[#00773e] px-3 rounded-md text-white leading-8 font-medium'>Back</Link>
    </div>
  );
};

export default NotFound;
