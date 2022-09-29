import React, { useEffect, useRef } from 'react';
import Footer from '../Footer';
import { FullHeader } from '../Header';
const MainLayout = ({ children }) => {
  const layoutRef = useRef();
  return (
    <div ref={layoutRef} className='h-screen overflow-scroll'>
      <FullHeader />
      {React.cloneElement(children, { layoutRef: layoutRef })}
      <Footer />
    </div>
  );
};

export default MainLayout;
