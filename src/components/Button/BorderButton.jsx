import { Link } from 'react-router-dom';

const BorderButton = ({ title, icon, ...props }) => {
    return (
        <div
            className={`w-full max-w-[368px] h-12 mb-2 border rounded-full border-gray-border hover:border-slate-800 hover:bg-gray-bg-btn flex justify-between items-center gap-x-1 after:content-[''] after:w-6 text-sm px-3 py-4 cursor-pointer`}
            {...props}
        >
            <span>{icon}</span>
            <span className='font-semibold text-gray-font uppercase'>{title}</span>
        </div>
    );
};

export default BorderButton;
