import { useCallback, useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import slugify from 'slugify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import parse from 'html-react-parser';
import styled from 'styled-components';
import { convert } from 'html-to-text';

import { db } from '../firebase-app/firebase-config';
import { client } from '../utils/typesense-client';

const HighLightContainer = styled.div`
  mark {
    color: #0c5dff;
    font-weight: 600;
    background-color: #fff;
  }
`;
const initialSearch = {
  search: '',
};
const searchTab = ['Bài viết', 'Podcast'];

const Search = () => {
  const [topic, setTopic] = useState();
  const [result, setResult] = useState();
  const [typeSearch, setTypeSearch] = useState({
    index: 0,
    type: 'blogs',
  });

  useEffect(() => {
    const fetchData = async () => {
      const topicRef = collection(db, 'topic');
      const topicQuery = query(topicRef, where('status', '==', 1), limit(5));
      const querySnapshot = await getDocs(topicQuery);
      let resultTopic = [];
      querySnapshot.forEach((doc) => {
        resultTopic.push({
          key: doc.id,
          name: doc.data().name,
          slug: '/' + slugify(doc.data().slug || doc.data().name, { lower: true }),
        });
      });
      setTopic(resultTopic);
    };
    fetchData();
  }, []);
  const handleSearch = (values, action) => {
    let search = {
      q: values.search,
      query_by: typeSearch.type === 'blogs' ? 'contentBlog,keywordBlog,titleBlog,topic' : 'desc,title,keyword,topic',
    };

    client
      .collections(typeSearch.type)
      .documents()
      .search(search)
      .then((searchResult) => setResult(searchResult));
  };

  return (
    <Formik initialValues={initialSearch} onSubmit={handleSearch}>
      {(formik) => (
        <form
          className={`${result ? 'pt-8 pb-40 px-[100px]' : 'py-40'}  mb-14 min-h-[85vh] max-w-6xl mx-auto`}
          onSubmit={formik.handleSubmit}
        >
          {/* Search */}
          <div className='pt-6 px-4 pb-2'>
            <div className='flex items-center mt-4 mb-3 border-b focus-within:border-b-primary-bg duration-200'>
              <Field
                name='search'
                placeholder='Bạn cần tìm thông tin gì...'
                className='flex-1 bg-white text-xl text-primary-bg font-semibold pr-4'
              />
              <button type='submit'>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className='w-[18px] h-[18px] p-[11px] block text-primary-bg font-bold cursor-pointer'
                />
              </button>
            </div>
          </div>
          {/* Hot search */}
          {topic && !result && (
            <div className='mt-1 px-4'>
              <h3 className='mb-4 text-base text-[#555]'>Tìm kiếm phổ biến: </h3>
              <div className='flex flex-wrap gap-3'>
                {topic.map((item, index) => (
                  <div
                    key={index}
                    className='py-1.5 px-3 border rounded-full cursor-pointer'
                    onClick={() => formik.setFieldValue('search', item.name)}
                  >
                    <span className='text-xs font-semibold text-blue-font'>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {result && (
            <div className='px-4 mt-6 flex'>
              <div className='sticky top-[196px] w-[276px] pr-6 flex flex-col uppercase text-xs font-semibold'>
                {searchTab.map((item, index) => (
                  <button
                    className={`p-3 mb-2bg-primary-bg rounded-lg flex items-center justify-between cursor-pointer uppercase ${
                      typeSearch.index === index ? 'text-white bg-primary-bg' : 'text-primary-bg bg-white'
                    }`}
                    onClick={() => {
                      setTypeSearch({
                        index: index,
                        type: item === 'Podcast' ? 'podcasts' : 'blogs',
                      });
                    }}
                  >
                    <span>{item}</span>
                    <span>{`(${result.found})`}</span>
                  </button>
                ))}
              </div>
              <div className='w-[calc(100%-276px)] pl-6 border-l'>
                {result?.hits.map((item, index) => (
                  <div className='flex items-center mb-8'>
                    <div className='w-2/5 mr-4'>
                      <img src={item.document.imageBlog || item.document.image} className='object-cover rounded-lg' />
                    </div>
                    <HighLightContainer className='w-[calc(60%-16px)] ml-4'>
                      <h3 className='text-xl font-semibold text-primary-bg line-clamp-2'>
                        {item.document.titleBlog || item.document.title}
                      </h3>
                      {item.highlights.map((item2light) => (
                        <p>{parse(item2light.snippet)}</p>
                      ))}
                    </HighLightContainer>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

export default Search;
