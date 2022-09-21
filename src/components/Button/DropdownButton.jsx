import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
const DropdownContainer = styled.div`
  .item-list {
    /* width */
    ::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
`;

const DropdownButton = ({ title, submenu, name, type, setValue, ...props }) => {
  const [isShow, setShow] = useState(false);
  const [valueDropdown, setValueDropdown] = useState();
  return (
    <DropdownContainer>
      {type === 'hover' && (
        <div
          className='relative text-white hover:bg-gray-bg hover:text-gray-font duration-300'
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <button className='p-4 text-sm font-semibold uppercase ' onClick={() => setShow(!isShow)}>
            {title}
            <FontAwesomeIcon className='ml-2' icon={faChevronDown} />
          </button>

          {/* Dropdown Menu */}
          {isShow && (
            <div
              className='absolute top-full w-52 pt-0.5 bg-transparent  shadow-xl z-20'
              onMouseOver={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <div className='p-4 bg-white rounded-b-lg'>
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
      )}
      {type === 'click' && (
        <div className='relative py-3'>
          <h3 className='font-semibold mb-2'>{title}</h3>
          <div
            className='flex items-center justify-between cursor-pointer w-full p-4 border rounded-[4px] border-dark-gray-bg text-lighter-gray-font'
            onClick={() => setShow(!isShow)}
          >
            <span className={`${valueDropdown && 'text-primary-bg'} text-sm`}>
              {valueDropdown || props.placeholder}
            </span>
            {isShow ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
          </div>
          {isShow && (
            <ul className='absolute bg-white z-30 item-list max-h-[169px] overflow-y-scroll w-full mt-1 px-4 py-2 border border-dark-gray-bg rounded-[4px] divide-y'>
              {submenu.length > 0 &&
                submenu.map((item, index) => (
                  <li
                    key={index}
                    className='font-semibold p-2 hover:bg-slate-200 rounded-md cursor-pointer'
                    onClick={() => {
                      setShow(false);
                      setValueDropdown(item.name);
                      setValue(name, item.name);
                    }}
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </DropdownContainer>
  );
};

export default DropdownButton;
