import { Formik } from 'formik';
import React from 'react';
import { TitleManage } from '../../components/ManageModule';
import { BlogInput as MediaInput } from '../../components/Input';
import { NormalButton } from '../../components/Button';

const initialMedia = {
  name: '',
  status: 1,
  relavite: [],
  slug: '',
};
const handleSubmit = async (values, actions) => {
  // try {
  //   const cloneTopic = { ...values };
  //   cloneTopic.slug = slugify(values.slug || values.name, { lower: true });
  //   const topicRef = collection(db, 'topic');
  //   await addDoc(topicRef, cloneTopic);
  //   notification['success']({
  //     message: 'Thêm chủ đề thành công',
  //     description: 'Xem các chủ đề tại bảng dưới!',
  //   });
  //   actions.resetForm();
  // } catch (err) {
  //   notification['error']({
  //     message: 'Có lỗi xảy ra!!!',
  //     description: 'Vui lòng kiểm tra và thử lại sau vài phút',
  //   });
  // }
};

function CreateMedia() {
  return (
    <div className='min-h-[75vh]'>
      <TitleManage title='Tạo podcast' />
      <Formik initialValues={initialMedia} onSubmit={handleSubmit}>
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-2 gap-x-2'>
              <MediaInput label='Tên chủ đề' name='name' placeholder='Thêm chủ đề mới' />
              <MediaInput label='Đường dẫn' name='slug' placeholder='VD: vi-du-ten-tieu-de' />
            </div>
            <div className='flex justify-end'>
              <NormalButton type='submit' title='Thêm chủ đề' className='py-2' />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateMedia;
