import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../Footer';
import { FullHeader } from '../Header';
const MainLayout = ({ children }) => {
  const layoutRef = useRef();
  const [scrollToTop, setScrollToTop] = useState(false);
  useEffect(() => {
    const handleScroll = (event) => {
      if (layoutRef.current.scrollTop > 500) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };
    layoutRef.current.addEventListener('scroll', handleScroll);
    layoutRef.current.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const handleScrollToTop = () => {
    layoutRef.current.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div ref={layoutRef} className='relative h-screen overflow-scroll scroll-smooth'>
      <FullHeader />
      {React.cloneElement(children, { layoutRef: layoutRef })}
      <Footer />
      {scrollToTop && (
        <button
          className='fixed bottom-10 right-10 p-3 bg-gray-bg-btn border border-lightest-gray hover:bg-[#ebeceed8] rounded-full'
          onClick={handleScrollToTop}
        >
          <FontAwesomeIcon icon={faChevronUp} className='w-4 h-4 block' />
        </button>
      )}
    </div>
  );
};

export default MainLayout;
