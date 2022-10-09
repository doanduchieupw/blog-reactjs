import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, HeartIcon } from '../../assets/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

function BlogCard({ image, title, topic, desc, createdAt, slug, isManage, like, bookmark, authorName, authorAvatar }) {
  return (
    <div className={`w-full mt-6 pb-6 border-b border-lightest-gray ${isManage ? 'md:flex md:gap-x-4' : ''}`}>
      <Link to={`/vn/${slug}`} className={`${isManage ? 'block mb-4 md:mb-0 md:w-2/5 md:shrink-0' : ''}`}>
        <img src={image} alt={title} className='w-full h-auto object-cover rounded-md' />
      </Link>
      <div className={`${isManage && 'flex flex-col justify-between flex-1'}`}>
        <p className={`mt-6 mb-2 text-xs uppercase font-semibold text-[#0c5dff] ${isManage && 'hidden'}`}>{topic}</p>
        <Link to={`/vn/${slug}`} className='inline-block mb-2 text-xl font-semibold text-primary-bg'>
          <span className={`${isManage && 'line-clamp-2'}`}>{title}</span>
        </Link>
        <p className='mb-3 text-sm text-gray-submenu-font line-clamp-3'>{desc}</p>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-submenu-font flex items-center gap-x-3'>
            {isManage && (
              <div className='flex items-center gap-x-2 cursor-pointer after:content-[""] after:block after:w-1 after:h-1 after:bg-slate-500 after:rounded-full'>
                <img src={authorAvatar} className='w-8 h-8 block rounded-full object-cover' />
                <span className='font-semibold'>{authorName}</span>
              </div>
            )}
            <span>{createdAt}</span>
          </div>
          {isManage ? (
            like ? (
              <HeartIcon />
            ) : (
              <FontAwesomeIcon icon={fasBookmark} className='block w-5 h-5 text-green-font' />
            )
          ) : (
            <Bookmark />
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
