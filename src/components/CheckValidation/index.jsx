import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTriangleExclamation,
    faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage } from 'formik';

const passwordValidation = [
    'Độ dài ít nhất 6 ký tự',
    'Bao gồm ít nhất 1 chữ số',
    'Bao gồm ít nhất 1 ký tự chữ',
];

const CheckValidation = ({ message, type, name, error }) => {
    return type === 'text' ? (
        <div>
            <div className='text-xs text-error-font leading-snug pl-4 mt-1.5'>
                <ErrorMessage name={name} />
            </div>
        </div>
    ) : (
        <div>
            <div className='mt-2'>
                {passwordValidation.map((item, index) => {
                    const checkFlag = message.some(
                        (checkItem) => checkItem === item
                    );
                    return (
                        <div key={index} className='flex gap-x-2'>
                            {checkFlag ? (
                                <FontAwesomeIcon
                                    icon={faTriangleExclamation}
                                    className='text-base text-error-font'
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className='text-base text-green-font'
                                />
                            )}
                            <span
                                className={`text-sm leading-relaxed ${
                                    checkFlag
                                        ? 'text-error-font'
                                        : 'text-green-font'
                                }`}
                            >
                                {item}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CheckValidation;
