import { Link } from 'react-router-dom';
const HoverButton = ({ title, to }) => {
    return (
        <Link to={to} className='px-3 py-1.5 rounded-full hover:bg-gray-bg-btn'>
            <span className='text-[14px] underline font-semibold leading-snug'>
                {title}
            </span>
        </Link>
    );
};

export default HoverButton;
