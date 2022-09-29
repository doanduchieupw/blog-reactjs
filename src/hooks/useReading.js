import { useState, useEffect } from 'react';

const useReading = () => {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const updateScrollPosition = () => {
      console.log(window.scrollY);
    };
    window.addEventListener('scroll', updateScrollPosition);
  }, []);

  return position;
};

export default useReading;
