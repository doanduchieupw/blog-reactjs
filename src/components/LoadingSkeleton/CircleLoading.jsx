import React from 'react';

function CircleLoading() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <span className='mt-80 border-4 border-green-border border-t-transparent w-14 h-14 rounded-full block animate-spin'></span>
    </div>
  );
}

export default CircleLoading;
