import { useField, useFormikContext } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faUpload,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

const storage = getStorage();

const BlogInput = ({ label, name, ...props }) => {
  const [fileName, setFileName] = useState();
  const [field, meta, helpers] = useField(name);
  const [loadProcess, setLoadProgress] = useState();
  const { setFieldValue, values } = useFormikContext();

  const handleImageSelect = (e) => {
    const file = e.currentTarget.files[0];
    if (!file) return;
    setFileName(file.name);
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => setPreviewImage(reader.result);
    handleUploadImage(file);
  };

  const handleUploadImage = (file) => {
    if (!file) return;
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setLoadProgress(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setFieldValue('imageBlog', downloadURL);
        });
      }
    );
  };

  const handleDeleteImage = () => {
    if (!fileName) return;
    const imageRef = ref(storage, 'images/' + fileName);
    deleteObject(imageRef)
      .then(() => {
        console.log('File deleted successfully');
      })
      .catch((error) => {
        console.log('Uh-oh, an error occurred!');
      });
  };

  return (
    <>
      {props.type === 'file' ? (
        // Image Upload Input
        <label htmlFor={name} className="cursor-pointer mt-4">
          <input
            id={name}
            type="file"
            onChange={handleImageSelect}
            className="hidden"
          />
          <span className="font-semibold mb-2">{label}</span>
          {values.imageBlog ? (
            <div className="group relative mt-1">
              <img
                src={values.imageBlog}
                className="object-cover w-full h-full rounded-md"
              />
              {/* Loading image */}
              <div className="absolute bottom-0 w-full h-full flex flex-col">
                <div
                  className={`flex-1 ${
                    loadProcess > 0 && loadProcess < 100
                      ? 'opacity-50 bg-lightest-gray flex items-center justify-center'
                      : ''
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faSpinner}
                    size="3x"
                    className={`text-green-500 opacity-100 ${
                      loadProcess > 0 && loadProcess < 100
                        ? 'animate-spin'
                        : 'hidden'
                    } `}
                  />
                </div>
                <div
                  className={`bg-green-500 h-1 bottom-0 rounded-md ${
                    loadProcess > 0 && loadProcess < 100 ? '' : 'hidden'
                  }`}
                  style={{
                    width: `${Math.ceil(loadProcess)}%`,
                  }}
                ></div>
              </div>
              <button
                className="absolute p-0.5 bg-orange-bg-btn rounded-full top-[-8px] right-[-8px] opacity-0 group-hover:opacity-100 transition-all"
                onClick={() => {
                  handleDeleteImage();
                }}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="w-4 h-4 block text-white"
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center border border-dark-gray-bg rounded-[4px] mt-1 py-6 image-upload">
              <FontAwesomeIcon icon={faUpload} className="w-8 h-8 block p-2" />
              <span className="text-xs italic text-light-gray-font">
                {props.placeholder}
              </span>
            </div>
          )}
        </label>
      ) : (
        // Text Input
        <div className="flex flex-col w-full py-3">
          <label htmlFor={name} className="font-semibold mb-2">
            {label}
          </label>
          <input
            id={name}
            name={name}
            {...field}
            {...props}
            className="p-4 border rounded-[4px] border-dark-gray-bg focus:border-green-border text-lighter-gray-font text-sm"
          />{' '}
        </div>
      )}
    </>
  );
};

export default BlogInput;