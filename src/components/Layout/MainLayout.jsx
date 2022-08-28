import { FullHeader } from '../Header';
const MainLayout = ({ children }) => {
    return (
        <div className=''>
            <FullHeader />
            {children}
        </div>
    );
};

export default MainLayout;
