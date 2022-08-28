import { DropdownButton } from '../Button';
const navList = [
    {
        title: 'Dành cho bạn',
        type: 'normal',
    },
    {
        title: 'Xu hướng',
        type: 'hot',
    },
    {
        title: 'Thảo luận',
        type: 'normal',
    },
    {
        title: 'Tạo bài viết',
        type: 'new',
    },
    {
        title: 'Khám phá',
        type: 'submenu',
        children: ['Đánh giá', 'Hướng dẫn', 'Giải trí', 'Podcasts'],
    },
];

const FullHeader = () => {
    return (
        <header className='w-full sticky top-0 h-16 lg:h-14 bg-header-primary z-10 shadow-md'>
            {/* Cotainer */}
            <div className='mx-[136px]'>
                {/* Mobile Header*/}
                {/* Left Header */}
                <div className='flex items-center'>
                    {/* Logo */}
                    <div className='w-14'>
                        <img src='/logo-blog-rm.png' alt='logo-header' />
                    </div>

                    {/* Navigation */}
                    <div className='flex'>
                        {navList.map((item, index) =>
                            item.type === 'submenu' ? (
                                <DropdownButton
                                    title={item.title}
                                    submenu={item.children}
                                />
                            ) : (
                                <button
                                    key={index}
                                    className='p-4 text-white text-sm font-semibold uppercase hover:bg-gray-bg hover:text-gray-font duration-300'
                                >
                                    {item.title}
                                    {item.type === 'hot' ? (
                                        <span className='px-2.5 py-0.5 ml-3 bg-orange-bg-btn rounded-full '>
                                            HOT
                                        </span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* Right Header */}
            </div>
        </header>
    );
};

export default FullHeader;
