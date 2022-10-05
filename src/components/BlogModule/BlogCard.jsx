import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from '../../assets/icons';

function BlogCard({ image, title, topic, desc, createdAt, slug }) {
  return (
    <div className='w-full mt-6 pb-6 border-b border-lightest-gray'>
      <Link to={`/vn/${slug}`}>
        <img src={image} alt={title} className='w-full h-auto object-cover rounded-md' />
      </Link>
      <div>
        <p className='mt-6 mb-2 text-xs uppercase font-semibold text-[#0c5dff]'>{topic}</p>
        <Link to={`/vn/${slug}`} className='mb-2 text-xl font-semibold text-primary-bg'>
          {title}
        </Link>
        <p className='mb-3 text-sm text-gray-submenu-font line-clamp-3'>{desc}</p>
        <div className='flex items-center justify-between'>
          <span className='text-xs text-gray-submenu-font'>{createdAt}</span>
          <Bookmark />
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
