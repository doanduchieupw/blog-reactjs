import React from 'react';

function NoDataManage({ title, desc }) {
  return (
    <div className='min-h-[600px] bg-[#f7f7f7] px-8 py-6 mt-6'>
      <h1 className='text-xl font-semibold mb-2'>{title}</h1>
      <p className='text-base'>{desc}</p>
    </div>
  );
}

export default NoDataManage;
