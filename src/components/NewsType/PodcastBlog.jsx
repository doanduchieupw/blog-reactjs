import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-app/firebase-config';
import { PodcastMain, PodcastSub, TitleSection } from '../NewsModule';

const PodcastBlog = ({ type }) => {
  const [podcast, setPodcast] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const podcastRef = collection(db, 'podcasts');
      const podcastQuery = query(podcastRef, where('type', '==', type), orderBy('createdAt', 'desc'), limit(4));
      const podcastSnapshot = await getDocs(podcastQuery);
      const podcastResult = [];
      podcastSnapshot.forEach((doc) => {
        podcastResult.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPodcast(podcastResult);
    };
    fetchData();
  }, []);
  return (
    <div className='mt-14'>
      {type === 'audio' && (
        <div>
          <TitleSection firstWord='Nghe gì' secondWord='hôm nay' />
          {podcast && (
            <div className='w-full lg:flex'>
              <PodcastMain
                image={podcast[0].image}
                url={podcast[0].link}
                title={podcast[0].title}
                topic={podcast[0].topic}
                slug={podcast[0].slug}
                type={podcast[0].type}
              />
              <div className='lg:w-1/2 lg:flex lg:flex-col lg:justify-between'>
                {podcast.map((item, index) => {
                  if (index === 0) return;
                  return (
                    <PodcastSub
                      image={item.image}
                      url={item.link}
                      title={item.title}
                      topic={item.topic}
                      slug={item.slug}
                      type={item.type}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {type === 'video' && (
        <div>
          <TitleSection firstWord='Xem gì' secondWord='hôm nay' />
          {podcast && (
            <div className='w-full lg:flex'>
              <PodcastMain
                image={podcast[0].image}
                url={podcast[0].link}
                title={podcast[0].title}
                topic={podcast[0].topic}
                slug={podcast[0].slug}
                type={podcast[0].type}
              />
              <div className='lg:w-1/2 lg:flex lg:flex-col lg:justify-between'>
                {podcast.map((item, index) => {
                  if (index === 0) return;
                  return (
                    <PodcastSub
                      image={item.image}
                      url={item.link}
                      title={item.title}
                      topic={item.topic}
                      slug={item.slug}
                      type={item.type}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PodcastBlog;
