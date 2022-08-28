import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faEyeSlash,
    faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import BorderInput from '../Input/BorderInput';
import { MoreButton } from '../Button';

const SignUpModal = () => {
    const {
        control,
        // register,
        handleSubmit,
        setValue,
        formState: { errors, isValid, isSubmitting },
        watch,
    } = useForm({});
    const [togglePass, setTogglePass] = useState(false);

    const handleSignUp = (data) => console.log(data);
    return (
        <div className='flex flex-col items-center'>
            <div className='w-full h-14 border-b border-b-slate-200 text-xl font-semibold flex justify-center items-center text-black'>
                Tạo Tài Khoản
            </div>
            <div className='max-w-[668px] p-10'>
                <div className='w-full flex flex-col items-start'>
                    <span className='text-sm font-semibold text-light-gray-font uppercase'>
                        Bước 1
                    </span>
                    <span className='text-[32px] font-semibold text-black mt-2'>
                        Tạo tài khoản với Email
                    </span>
                    <span className='text-base font-normal text-gray-submenu-font mt-2'>
                        Nhập địa chỉ email, mật khẩu và xác thực captcha để tạo
                        tài khoản
                    </span>

                    <form
                        className='mt-3 w-full'
                        onSubmit={handleSubmit(handleSignUp)}
                    >
                        <BorderInput
                            name='email'
                            label='email'
                            placeholder='example@email.com'
                            icon={
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer'
                                    onClick={() => setValue('email', '')}
                                />
                            }
                            // {...register('email')}
                            control={control}
                        />
                        <BorderInput
                            name='password'
                            type={togglePass ? 'password' : 'text'}
                            label='mật khẩu'
                            placeholder='Ít nhất 6 ký tự'
                            icon={
                                togglePass ? (
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer py-4 rounded-full active:bg-slate-200'
                                        onClick={() => setTogglePass(false)}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faEyeSlash}
                                        className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer py-4 rounded-full active:bg-slate-200'
                                        onClick={() => setTogglePass(true)}
                                    />
                                )
                            }
                            subIcon={
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer'
                                    onClick={() => setValue('password', '')}
                                />
                            }
                            // {...register('password')}
                            control={control}
                        />
                        <div className='h-px w-full my-6 bg-slate-200 '></div>

                        <MoreButton title='Thông tin bổ sung'/>
                        <button type='submit' className='h-4 w-8'>
                            OK
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpModal;
