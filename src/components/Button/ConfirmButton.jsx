import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useFormikContext } from 'formik';

const ConfirmButton = ({ title, isLoading, disabled, ...props }) => {
    const { values, submitForm } = useFormikContext();
    
    return (
        <button
            className='h-12 w-full max-w-xl bg-primary-bg rounded-full flex gap-x-2 items-center justify-center active:bg-dark-gray-bg hover:opacity-50 duration-300 disabled:opacity-40'
            type='submit'
            disabled={!disabled}
            onClick={submitForm}
            {...props}
        >
            <span className='text-sm text-white font-semibold uppercase '>
                {!isLoading && title}
                {isLoading && <FontAwesomeIcon icon={faSpinner} spin size='2x'/>}
            </span>
        </button>
    );
};

export default ConfirmButton;
