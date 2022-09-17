import Footer from '../Footer';
import { FullHeader } from '../Header';
const MainLayout = ({ children }) => {
  return (
    <div className='h-screen overflow-scroll'>
      <FullHeader />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
