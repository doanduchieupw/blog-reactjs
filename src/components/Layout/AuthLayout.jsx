import { LogoHeader } from "../Header";
const AuthLayout = ({children}) => {
    return (
        <div className='h-screen'>
            <LogoHeader />
            {children}
        </div>
    );
};

export default AuthLayout;
