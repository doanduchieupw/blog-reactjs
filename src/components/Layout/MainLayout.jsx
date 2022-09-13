import { FullHeader } from '../Header';
const MainLayout = ({ children }) => {
    return (
        <div className='h-screen overflow-scroll'>
            <FullHeader />
            {children}
        </div>
    );
};

export default MainLayout;
