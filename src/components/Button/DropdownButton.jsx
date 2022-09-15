import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const DropdownButton = ({ title, submenu }) => {
  const [isShow, setShow] = useState(false);

  return (
    <div
      className='relative text-white hover:bg-gray-bg hover:text-gray-font duration-300'
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button
        className='p-4 text-sm font-semibold uppercase '
        onClick={() => setShow(!isShow)}
        // onMouseOver={() => setShow(true)}
        // onMouseLeave={() => setShow(false)}
      >
        {title}
        <FontAwesomeIcon className='ml-2' icon={faChevronDown} />
      </button>

      {/* Dropdown Menu */}
      {isShow && (
        <div
          //   className='absolute top-[calc(100%)] w-52 p-4 bg-white rounded-b-lg shadow-xl z-20'
          className='absolute top-[calc(100%)] w-52 pt-0.5 bg-transparent  rounded-b-lg shadow-xl z-20'
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <div className='p-4 bg-white'>
            <ul className='flex flex-col justify-start'>
              {submenu.map((item, index) => (
                <li
                  key={index}
                  className='p-1 mb-1 rounded-md cursor-pointer hover:bg-gray-bg hover:text-gray-font text-sm font-medium text-gray-submenu-font leading-relaxed flex items-center '
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
