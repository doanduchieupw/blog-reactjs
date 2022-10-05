import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NormalButton } from '../Button';

const groupMenuList = [
  {
    title: 'Chuyên mục',
    list: ['Cuộc Sống'],
  },
  {
    title: 'Các sự kiện',
    list: ['Cởi mở đi Unitour', 'Flavors Vietnam 2022', 'Ậm ừ talk', 'VNI Summit'],
  },
  {
    title: 'Khám phá',
    list: ['Series', 'Video'],
  },
  {
    title: 'Về chúng tôi',
    list: ['Hợp tác truyền thông', 'Cơ Hội Nghề Nghiệp', 'Liên hệ'],
  },
];

export const GroupMenu = ({ sub }) => {
  return (
    <div className={`flex lg:flex-1 items-start justify-start flex-wrap `}>
      {groupMenuList.map((item, index) => (
        <div className={`${sub ? 'w-full mt-3 border-b border-slate-600 pb-2 mb-6' : 'w-1/2 lg:w-1/3 mb-10 pr-4'}`}>
          <h3
            className={`uppercase mb-3 ${
              sub ? 'text-dark-gray-bg text-sm' : 'text-primary-bg font-semibold text-base '
            } `}
          >
            {item.title}
          </h3>
          <ul>
            {item.list.map((itemList, indexList) => (
              <li className={`${sub ? 'text-xl font-semibold text-white pb-4' : 'text-sm  pb-2'} leading-[1.7]`}>
                {itemList}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export const MiniForm = ({ sub }) => {
  return (
    <div className='mb-6 xs:max-w-[368px] sm:max-w-xl md:mr-32'>
      <h4 className={`'xs:max-w-xs sm:max-w-[568px] text-[20px] font-semibold mb-2 ${sub ? 'text-white' : ''}`}>
        <span className={`${sub ? 'text-white' : 'text-[#B72727]'}`}>5 tin tức</span> bạn cần biết mỗi tuần
      </h4>
      <p className={`font-normal leading-relaxed mb-4 ${sub ? 'text-[#D6D6D6] text-xs' : 'text-sm '}`}>
        Mỗi thứ Tư, bạn sẽ nhận được email tổng hợp những tin tức nổi bật tuần qua một cách súc tích, dễ hiểu, và hoàn
        toàn miễn phí!
      </p>
      <div className='xs:flex xs:gap-x-2 xs:items-center'>
        <div className='flex gap-x-2 items-center w-full h-12 xs:h-10 px-4 mb-3 xs:mb-0 border border-dark-gray-bg rounded-lg'>
          <FontAwesomeIcon icon={faEnvelope} className='block w-5 h-5' />
          <input
            type='text'
            placeholder='Nhập địa chỉ email của bạn'
            className={`'flex-1  text-light-gray-font ${sub ? 'bg-sub-menu' : 'bg-footer-bg'}`}
          />
        </div>
        <NormalButton
          title='Đăng ký!'
          className='w-full xs:max-w-[96px] xs:h-full xs:py-1 px-4 py-2 uppercase bg-[#B72727] cursor-pointer'
        />
      </div>
      <div className='mt-12'>
        <h4 className='text-base font-semibold uppercase mb-3'>Tải ứng dụng của chúng tôi</h4>
        <div className='flex gap-x-2'>
          <div className='flex  xs:flex-col gap-2'>
            <img
              className='w-36 object-cover'
              src='https://img.vietcetera.com/uploads/images/27-may-2022/app-store.png'
              alt='app-store'
            />
            <img
              className='w-36 object-cover'
              src='https://img.vietcetera.com/uploads/images/27-may-2022/gg-play.png'
              alt='google-play'
            />
          </div>
          <img
            src='https://img.vietcetera.com/uploads/images/27-may-2022/qr-down-app.png'
            alt='QR'
            className='hidden xs:block'
          />
        </div>
      </div>
    </div>
  );
};

const SubcribeNews = () => {
  return (
    <div className='mt-8 max-w-xl md:max-w-6xl lg:mx-auto md:flex'>
      <MiniForm />
      <GroupMenu />
    </div>
  );
};

export default SubcribeNews;
