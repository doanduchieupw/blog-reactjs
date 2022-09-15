import { faGlobe, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SubHeader = ({ isMobile, ...props }) => {
  return (
    <div
      className={`bg-submenu-bg z-30 w-screen h-screen px-4 ${
        isMobile ? 'animate-switchLeft' : 'transition translate-x-full duration-300 hidden'
      } overflow-hidden`}
    >
      <div>
        <div className='flex flex-col pt-4 pb-6 '>
          {/* Header */}
          <div className='flex justify-between'>
            <span className='flex gap-x-2 items-center text-white '>
              <FontAwesomeIcon icon={faGlobe} className='w-5 h-5' />
              <h1 className='uppercase text-xs text-white font-semibold'>International</h1>
            </span>
            <button className='border rounded-full p-2' {...props}>
              <FontAwesomeIcon icon={faXmark} className='block w-6 h-6 text-white hover:text-black' />
            </button>
          </div>

          {/* Search Bar */}
          <div className='flex items-center mt-4 border-b '>
            <input
              placeholder='Bạn cần tìm thông tin gì...'
              className='flex-1 bg-submenu-bg text-xl text-white font-semibold px-1 py-2'
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className='p-[9px] text-white hover:text-black cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
