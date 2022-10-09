import React from 'react';

function Hashtag({ content }) {
  return <span className='inline-block p-2 mr-3 mb-3 bg-gray-bg-btn rounded-lg'>{`#${content}`}</span>;
}

export default Hashtag;
