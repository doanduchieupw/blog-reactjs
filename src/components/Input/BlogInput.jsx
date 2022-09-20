import { useField, useFormikContext } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const BlogInput = ({ label, name, progress, ...props }) => {
  const [previewImage, setPreviewImage] = useState();
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleImageSelect = (e) => {
    const file = e.currentTarget.files[0];
    if (!file) return;
    setFieldValue(name, file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPreviewImage(reader.result);
  };
  return (
    <>
      {props.type === 'file' ? (
        // Image Upload Input
        <label htmlFor={name} className='cursor-pointer mt-4'>
          <input id={name} type='file' onChange={handleImageSelect} className='hidden' />
          <span className='font-semibold mb-2'>{label}</span>
          {previewImage ? (
            <div className='group relative mt-1'>
              <img src={previewImage} className='object-cover w-full h-full rounded-md' />
              {/* Loading image */}
              <div className='absolute bottom-0 w-full h-full flex flex-col'>
                <div
                  className={`flex-1 ${
                    progress > 0 && progress < 100 ? 'opacity-50 bg-lightest-gray flex items-center justify-center' : ''
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faSpinner}
                    size='3x'
                    className={`text-green-500 opacity-100 ${
                      progress > 0 && progress < 100 ? 'animate-spin' : 'hidden'
                    } `}
                  />
                </div>
                <div
                  className={`bg-green-500 h-1 bottom-0 rounded-md ${progress > 0 && progress < 100 ? '' : 'hidden'}`}
                  style={{
                    width: `${Math.ceil(progress)}%`,
                  }}
                ></div>
              </div>
              <button
                className='absolute p-0.5 bg-orange-bg-btn rounded-full top-[-8px] right-[-8px] opacity-0 group-hover:opacity-100 transition-all'
                onClick={() => setPreviewImage(null)}
              >
                <FontAwesomeIcon icon={faXmark} className='w-4 h-4 block text-white' />
              </button>
            </div>
          ) : (
            <div className='flex flex-col items-center border border-dark-gray-bg rounded-[4px] mt-1 py-6 image-upload'>
              <FontAwesomeIcon icon={faUpload} className='w-8 h-8 block p-2' />
              <span className='text-xs italic text-light-gray-font'>{props.placeholder}</span>
            </div>
          )}
        </label>
      ) : (
        // Text Input
        <div className='flex flex-col w-full py-3'>
          <label htmlFor={name} className='font-semibold mb-2'>
            {label}
          </label>
          <input
            id={name}
            name={name}
            {...field}
            {...props}
            className='p-4 border rounded-[4px] border-dark-gray-bg focus:border-green-border text-lighter-gray-font text-sm'
          />{' '}
        </div>
      )}
    </>
  );
};

export default BlogInput;
