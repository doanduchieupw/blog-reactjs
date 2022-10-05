import React from 'react';

function UserFollowCard({ image, name }) {
  return (
    <div className='flex items-center gap-x-4 mt-3 '>
      <img src={image} alt={name} className='w-14 h-14 block rounded-full object-cover' />
      <h3 className='text-lg font-semibold text-primary-bg'>{name}</h3>
    </div>
  );
}

export default UserFollowCard;
