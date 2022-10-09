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
  max-height: 195px;
  overflow: hidden;
  margin-bottom: 24px;
  p {
    font-size: 16px;
    line-height: 1.75rem;
    margin-bottom: 1.5rem;
    max-width: 568px;
    color: #292929;
  }
`;

function FullPodcast() {
  const { slug } = useParams();
  const [podcast, setPodcast] = useState();
  const [isPlay, setPlay] = useState(false);
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
                className='w-36 h-36 block object-cover rounded-xl mb-4 mr-5'
              />
              <div className='w-[calc(100%-164px)]'>
                <p className='text-xs text-gray-submenu-font mb-1'>{podcast.createdAtFormat}</p>
                <h1 className='text-base text-primary-bg font-semibold'>{podcast.title}</h1>
              </div>
              <button
                className='w-full h-14 px-6 py-4 bg-primary-bg rounded-full'
                onClick={() => {
                  setShowController(true);
                  setPlay(!isPlay);
                }}
              >
                {isPlay ? (
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
            <div className='mt-6'>
              <h1 className='text-[32px] font-bold uppercase mb-4'>Nội dung podcast</h1>
              <PodcastContent>{parse(podcast.desc)}</PodcastContent>
            </div>
            {podcast.keyword.map((item, index) => {
              if (index === 0) return;
              return <Hashtag content={item} />;
            })}
          </div>
          {isShowController && (
            <div className='fixed bottom-0 h-[132px] bg-white z-30 w-full border-t border-t-lightest-gray'>
              <div className='my-6 mx-auto pl-4 max-w-6xl flex items-start justify-center'>
                <div className='w-2/3 flex'>
                  <div className='flex'>
                    <img src={podcast.image} className='w-20 h-20 block object-cover rounded-lg mr-2' />
                    <div className='w-[calc(100%-88px)] text-xs font-semibold overflow-clip my-auto'>
                      <span className='uppercase text-blue-font line-clamp-1 mb-1'>{podcast.topic}</span>
                      <h1 className='animate-scrollTitle whitespace-nowrap inline-block '>{podcast.title}</h1>
                    </div>
                  </div>
                  <PodcastPlayerControl url={podcast.link} />
                </div>
                <div className='w-1/3 flex justify-end'>
                  <button
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
