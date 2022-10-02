import { faFacebookF, faInstagram, faLinkedinIn, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubcribeNews from './SubcribeNews';

const footerIcon = [
  <FontAwesomeIcon icon={faFacebookF} className='w-5 h-5 block' />,
  <FontAwesomeIcon icon={faYoutube} className='w-5 h-5 block' />,
  <FontAwesomeIcon icon={faInstagram} className='w-5 h-5 block' />,
  <FontAwesomeIcon icon={faTiktok} className='w-5 h-5 block' />,
  <FontAwesomeIcon icon={faLinkedinIn} className='w-5 h-5 block' />,
];
const Footer = () => {
  return (
    <footer className='bg-footer-bg py-10 px-4 xs:pt-6'>
      <div className='w-full border-b border-slate-200 max-w-6xl mx-auto'>
        <span className='text-6xl font-bold leading-normal'>TechEBlog.</span>
        <p className='px-2 tracking-wider'>Góc nhìn đa chiều về Việt Nam hiện đại.</p>
        <div className='mt-3 flex gap-x-3 flex-wrap'>
          {footerIcon.map((item, index) => (
            <span key={index} className='p-2.5'>
              {item}
            </span>
          ))}
        </div>
      </div>
      <SubcribeNews />
    </footer>
  );
};

export default Footer;
