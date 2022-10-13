import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import styled from 'styled-components';

import { db } from '../firebase-app/firebase-config';
import { fromNow } from '../utils/time';
import { Hashtag } from '../components/BlogModule';
import { PodcastPlayerControl } from '../components/PodcastModule';

const PodcastContent = styled.div`
  max-height: ${(props) => (props.more ? 'fit-content' : '196px')};
  overflow: hidden;
  transition-duration: 0.3s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  margin-bottom: 24px;
  p {
    font-size: 16px;
    line-height: 1.75rem;
    margin-bottom: 1.5rem;
    max-width: 568px;
    color: #292929;
  }
  ol {
    list-style: revert;
    margin: revert;
    padding: revert;
    font-family: PoppinsVN, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.75em;
  }
`;

function FullPodcast() {
  const { slug } = useParams();
  const [podcast, setPodcast] = useState();
  const [play, setPlay] = useState(false);
  const [more, setMore] = useState(false);
  const [isShowController, setShowController] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const podcastRef = collection(db, 'podcasts');
        const podcastQuery = query(podcastRef, where('slug', '==', slug));
        const podcastSnapshot = await getDocs(podcastQuery);
        if (podcastSnapshot.empty) {
          navigate('/khong-ton-tai');
          return;
        }
        podcastSnapshot.forEach((doc) => {
          setPodcast({
            podcastID: doc.id,
            ...doc.data(),
            createdAtFormat: fromNow(doc.data().createdAt.seconds),
            keyword: doc.data().keyword.split('#'),
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className=''>
      {podcast && (
        <div className='relative min-h-full pt-16'>
          <div className='max-w-6xl px-4 mt-6 lg:mx-auto'>
            {/* Image */}
            <div className='flex items-center justify-start flex-wrap'>
              <img
                src={podcast.image}
                alt={podcast.title}
                className='w-36 h-36 block object-cover rounded-xl mb-4 mr-5 md:max-w-[340px] md:w-full md:h-auto'
              />
              <div className='w-[calc(100%-164px)] md:w-[calc(100%-360px)]'>
                <p className='text-xs text-gray-submenu-font mb-1'>{podcast.createdAtFormat}</p>
                <h1 className='text-base xs:text-xl md:text-[40px] md:leading-[1.4em] text-primary-bg font-semibold'>
                  {podcast.title}
                </h1>
                <button
                  className='h-10 md:h-14 duration-200 px-6 py-4 bg-primary-bg rounded-full hidden xs:flex justify-center items-center mr-5 mt-4 '
                  onClick={() => {
                    setShowController(true);
                    setPlay(!play);
                  }}
                >
                  {play ? (
                    <div className='flex items-center justify-center gap-x-3 '>
                      <FontAwesomeIcon icon={faPause} className='text-white text-xl' />
                      <span className='text-white text-base font-semibold uppercase leading-4 '>Tạm dừng</span>
                    </div>
                  ) : (
                    <div className='flex items-center justify-center gap-x-3 '>
                      <FontAwesomeIcon icon={faPlay} className='text-white text-xl' />
                      <span className='text-white text-base font-semibold uppercase leading-4 '>Nghe</span>
                    </div>
                  )}
                </button>
              </div>
              <button
                className='w-full h-14 px-6 py-4 bg-primary-bg rounded-full xs:hidden'
                onClick={() => {
                  setShowController(true);
                  setPlay(!play);
                }}
              >
                {play ? (
                  <div className='flex items-center justify-center gap-x-3 '>
                    <FontAwesomeIcon icon={faPause} className='text-white text-xl' />
                    <span className='text-white text-base font-semibold uppercase leading-4 '>Tạm dừng</span>
                  </div>
                ) : (
                  <div className='flex items-center justify-center gap-x-3 '>
                    <FontAwesomeIcon icon={faPlay} className='text-white text-xl' />
                    <span className='text-white text-base font-semibold uppercase leading-4 '>Nghe</span>
                  </div>
                )}
              </button>
            </div>
            {/* Content */}
            <div className='mt-6 md:flex md:flex-wrap md:justify-between'>
              <h1 className='w-full text-[32px] font-bold uppercase mb-4'>Nội dung podcast</h1>
              <div>
                <PodcastContent more={more}>{parse(podcast.desc)}</PodcastContent>
                <button
                  type='button'
                  className='uppercase text-base font-semibold border border-primary-bg rounded-full px-4 py-2 mb-10'
                  onClick={() => setMore(!more)}
                >
                  {more ? 'Thu gọn' : 'Xem thêm'}
                </button>
              </div>
              <div className='mr-6'>
                <h1 className='text-xl font-semibold mb-4'>Liên kết</h1>
                <div className='flex items-center mb-4'>
                  <img
                    src='https://vietcetera.com/uploads/images/21-feb-2022/spotify.png'
                    className='w-8 h-8 object-cover block mr-2'
                  />
                  <p className='text-xs font-semibold'>Spotify</p>
                </div>
              </div>
            </div>
            <div className='mb-6'>
              {podcast.keyword.map((item, index) => {
                if (index === 0) return;
                return <Hashtag key={index} content={item} />;
              })}
            </div>
          </div>
          {isShowController && (
            <div className='fixed bottom-0 h-[132px] bg-white z-30 w-full border-t border-t-lightest-gray animate-switchUp'>
              <div className='my-6 mx-auto pl-4 max-w-6xl flex items-start justify-center'>
                {/* Info podcast */}
                <div className='w-2/3 md:w-3/4 flex shrink-0'>
                  {/* Image & Title */}
                  <div className='flex w-1/2'>
                    <img src={podcast.image} className='w-20 h-20 block object-cover rounded-lg mr-2' />
                    <div className='w-[calc(100%-88px)] text-xs font-semibold overflow-clip my-auto'>
                      <span className='uppercase text-blue-font line-clamp-1 mb-1'>{podcast.topic}</span>
                      <h1 className='animate-scrollTitle whitespace-nowrap inline-block md:text-base'>
                        {podcast.title}
                      </h1>
                    </div>
                  </div>
                  {/* Controller */}
                  <PodcastPlayerControl url={podcast.link} play={play} setPlay={setPlay} />
                </div>
                {/* Close and minium */}
                <div className='w-1/3 flex justify-end'>
                  <button
                    className='w-12 h-12 flex items-start justify-center'
                    onClick={() => {
                      setShowController(false);
                      setPlay(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faClose} className='text-xl' />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FullPodcast;
