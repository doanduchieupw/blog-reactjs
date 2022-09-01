import styled from 'styled-components';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { Field, useField } from 'formik';

const InputContainer = styled.div`
    :focus-within {
        border-color: ${(props) => (props.error ? '#B72727' : '#000')};
    }
    input:valid {
        background-color: ${(props) =>
            props.error ? '#FFF8F8 !important' : ''};
    }
    .ant-picker-input > input {
        background-color: #fff !important;
    }
`;
const BorderInput = ({
    name,
    type = 'text',
    label,
    icon,
    subIcon,
    error,
    control,
    setValue,
    ...props
}) => {
    const isIcon = icon ? true : false;
    const isSubIcon = subIcon ? true : false;
    const [field, meta, helpers] = useField(name);
    return (
        <InputContainer
            error={error}
            className={`max-h-16 w-full py-2.5 pr-2 pl-4 mt-3 border  rounded-xl flex items-center ${
                error ? 'bg-error-bg border-error-font' : 'border-slate-200'
            }`}
        >
            <div className='flex-1 flex-col items-start'>
                <label
                    htmlFor={name}
                    className={`w-full text-sm ${
                        error ? 'text-error-font' : 'text-gray-font'
                    } font-semibold leading-5 uppercase`}
                >
                    {label}
                </label>
                {type === 'date' ? (
                    <DatePicker
                        className='w-full max-h-6 h-6 text-sm font-normal leading-6 cursor-pointer'
                        style={{ padding: '0px' }}
                        bordered={false}
                        placeholder='YYYY-MM-DD'
                        onChange={(date, dateString) =>
                            setValue('dateOfBirth', dateString)
                        }
                    />
                ) : (
                    <Field
                        id={name}
                        name={name}
                        type={type}
                        className={`w-full max-h-6 h-6 text-sm font-normal leading-6 ${
                            field?.value === '' ? 'bg-white' : 'bg-[#e8f0fe] ? '
                        }`}
                        {...props}
                    />
                )}
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
