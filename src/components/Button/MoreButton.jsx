import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const MoreButton = ({ title, state, ...props }) => {
    return (
        <button
            className='h-12 w-full bg-gray-bg-btn border border-slate-300 rounded-full flex gap-x-2 items-center justify-center active:bg-dark-gray-bg'
            type='button'
            {...props}
        >
            <span className='text-sm text-gray-font font-semibold uppercase '>
                {title}
            </span>
            {state ? (
                <FontAwesomeIcon icon={faAngleUp} />
            ) : (
                <FontAwesomeIcon icon={faAngleDown} />
            )}
        </button>
    );
};

export default MoreButton;
