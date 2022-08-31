import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faEyeSlash,
    faCircleXmark,
    faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BorderInput from '../Input/BorderInput';
import { MoreButton, ConfirmButton } from '../Button';
import CheckValidation from '../CheckValidation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase-app/firebase-config';
import { addDoc, collection } from 'firebase/firestore';

const signUpSchema = yup.object({
    email: yup
        .string()
        .email('Email chưa đúng')
        .required('Email không thể để trống'),
    password: yup
        .string()
        .required()
        .min(6, 'Độ dài ít nhất 6 ký tự')
        .matches(RegExp('(.*\\d.*)'), 'Bao gồm ít nhất 1 chữ số')
        .matches(RegExp('(^.*[a-zA-Z]+.*$)'), 'Bao gồm ít nhất 1 ký tự chữ'),
    // dateOfBirth: yup
    //     .date()
    //     .min(
    //         yup.ref('originalEndDate'),
    //         ({ min }) => `Date needs to be before ${min}`
    //     ),
});

const SignUpModal = ({ onCancel }) => {
    const {
        control,
        // register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isValid, isSubmitting },
        watch,
    } = useForm({
        mode: 'onChange',
        criteriaMode: 'all',
        reValidateMode: 'onChange',
        resolver: yupResolver(signUpSchema, { abortEarly: false }),
    });
    const [togglePass, setTogglePass] = useState(false);
    const [showMore, setShowMore] = useState(true);
    const [errorPassword, setErrorPassword] = useState([]);
    const watchPassword = watch('password');

   
    useEffect(() => {
        console.log('59',watchPassword)
        console.log('61',errors);
        const errorRegex =
            typeof errors?.password?.types?.matches === 'undefined'
                ? []
                : typeof errors?.password?.types?.matches === 'string'
                ? [errors?.password?.types?.matches]
                : [...errors?.password?.types?.matches];
        const errorLength =
            typeof errors?.password?.types?.min === 'undefined'
                ? []
                : [errors?.password?.types?.min];
        console.log('72',[...errorRegex, ...errorLength])
        setErrorPassword([...errorRegex, ...errorLength]);
    }, [watchPassword]);


    const handleSignUp = async (user) => {
        if (!isValid) return;
        console.log(user);
        await createUserWithEmailAndPassword(auth, user.email, user.password);
        await updateProfile(auth.currentUser, {
            displayName: user.fullname,
        });
        const collectionRef = collection(db, 'users');
        await addDoc(collectionRef, {
            email: user.email,
            password: user.password,
            fullname: user?.fullname || 'Người mới',
        });
    };

    return (
        <div className='flex flex-col items-center min-h-screen'>
            <div className='w-full h-14 sticky top-0 bg-white border-b border-b-slate-200 text-xl font-semibold flex justify-center items-center text-black'>
                <FontAwesomeIcon
                    icon={faAngleLeft}
                    className='absolute top-[calc(50%-10px)] left-1/4 cursor-pointer'
                    onClick={onCancel}
                />
                <span>Tạo Tài Khoản</span>
            </div>
            <div className='max-w-[668px] p-2 md:p-5 lg:p-10 flex-1'>
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
                            error={Boolean(errors?.email)}
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
                        {errors?.email && (
                            <CheckValidation
                                message={errors?.email.message}
                                type='text'
                            />
                        )}
                        <BorderInput
                            name='password'
                            type={togglePass ? 'text' : 'password'}
                            label='mật khẩu'
                            placeholder='Ít nhất 6 ký tự'
                            error={Boolean(errors?.password)}
                            icon={
                                togglePass ? (
                                    <FontAwesomeIcon
                                        icon={faEyeSlash}
                                        className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer py-4 rounded-full active:bg-slate-200'
                                        onClick={() => setTogglePass(false)}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faEye}
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
                        {errors?.password && (
                            <CheckValidation
                                message={errorPassword}
                                type='password'
                            />
                        )}
                        <div className='h-px w-full my-6 bg-slate-200 '></div>

                        <MoreButton
                            title='Thông tin bổ sung'
                            state={showMore}
                            onClick={() => setShowMore(!showMore)}
                        />
                        {showMore && (
                            <div className='more-information transition transform duration-200'>
                                <BorderInput
                                    name='fullname'
                                    label='Họ và tên'
                                    placeholder='VD: Nguyễn Văn A'
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faCircleXmark}
                                            className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer'
                                            onClick={() =>
                                                setValue('fullname', '')
                                            }
                                        />
                                    }
                                    control={control}
                                />
                                <BorderInput
                                    name='dateOfBirth'
                                    label='Ngày sinh'
                                    placeholder='DD-MM-YYYY'
                                    type='date'
                                    setValue={setValue}
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faCircleXmark}
                                            className='px-4 text-lg text-light-gray-font hover:text-black cursor-pointer'
                                            onClick={() =>
                                                setValue('dateOfBirth', '')
                                            }
                                        />
                                    }
                                    control={control}
                                />
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <div
                className='sticky bottom-0 h-16 w-full px-4 py-2 flex items-center justify-center bg-white border-t border-slate-200'
                onClick={handleSubmit(handleSignUp)}
            >
                <ConfirmButton
                    title='Tạo tài khoản'
                    disabled={isValid}
                    isLoading={isSubmitting}
                />
            </div>
        </div>
    );
};

export default SignUpModal;
