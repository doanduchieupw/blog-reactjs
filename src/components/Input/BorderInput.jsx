import styled from 'styled-components';
import { useController } from 'react-hook-form';

const InputContainer = styled.div`
    :focus-within {
        border-color: #000;
    }
    input:valid {
        background-color: #e8f0fe;
    }
`;
const BorderInput = ({
    name,
    type = 'text',
    label,
    icon,
    subIcon,
    control,
    ...props
}) => {
    const { field } = useController({ control, name, defaultValue: '' });
    const isIcon = icon ? true : false;
    const isSubIcon = subIcon ? true : false;
    return (
        <InputContainer className='max-h-16 w-full py-2.5 pr-2 pl-4 mt-3 border border-slate-200 rounded-xl flex items-center'>
            <div className='flex-1 flex-col items-start'>
                <label
                    htmlFor={name}
                    className='w-full text-sm text-gray-font font-semibold leading-5 uppercase'
                >
                    {label}
                </label>
                <input
                    id={name}
                    required
                    type={type}
                    className='w-full max-h-6 h-6 text-sm font-normal leading-6'
                    {...field}
                    {...props}
                />
            </div>
            {isSubIcon && field.value !== '' && (
                <>
                    {subIcon} <div className='w-px h-8 bg-slate-200'></div>
                </>
            )}
            {isIcon && type === 'text' && field.value !== '' && icon}
            {isIcon && type === 'password' && icon}
        </InputContainer>
    );
};

export default BorderInput;
