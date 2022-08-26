const LogoHeader = () => {
    return (
        <div className='flex justify-center h-14 w-full border-b border-b-slate-200'>
            <img src="/logo-blog-rm.png" alt="logo" />
            <span className='text-center text-4xl font-semibold leading-[56px] tracking-tight'>
                <span className="text-yellow-logo">Tech</span>
                <span className="text-green-logo">E</span>
                <span className="text-blue-logo">Blog</span>
            </span>
        </div>
    );
};

export default LogoHeader;
