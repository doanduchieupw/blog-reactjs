import { useEffect, useRef, useState } from 'react';
import { notification, Popconfirm, Table, Tag, Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { Formik } from 'formik';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';

import { NormalButton } from '../../components/Button';
import { BlogInput as TopicInput } from '../../components/Input';
import { TitleManage } from '../../components/ManageModule';
import { db } from '../../firebase-app/firebase-config';

const initialTopic = {
  name: '',
  status: 1,
  relative: [],
  slug: '',
  desc: '',
};
const handleSubmit = async (values, actions) => {
  try {
    const cloneTopic = { ...values };
    cloneTopic.slug = slugify(values.slug || values.name, { lower: true });
    const topicRef = collection(db, 'topic');
    await addDoc(topicRef, cloneTopic);
    notification['success']({
      message: 'Thêm chủ đề thành công',
      description: 'Xem các chủ đề tại bảng dưới!',
    });
    actions.resetForm();
  } catch (err) {
    notification['error']({
      message: 'Có lỗi xảy ra!!!',
      description: 'Vui lòng kiểm tra và thử lại sau vài phút',
    });
  }
};

const TopicContainer = styled.div`
  .ant-btn-primary {
    background-color: #1890ff !important;
  }
`;

const CreateTopic = () => {
  const [topic, setTopic] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff !important' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Chủ đề',
      dataIndex: 'name',
      key: 'name',
      render: (topic) => {
        let colorArr = [
          'magenta',
          'red',
          'volcano',
          'orange',
          'gold',
          'lime',
          'green',
          'cyan',
          'blue',
          'geekblue',
          'purple',
        ];
        return (
          <Tag color={colorArr[Math.floor(Math.random() * 100) % 11]} key={topic}>
            {topic.toUpperCase()}
          </Tag>
        );
      },
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Đường dẫn',
      dataIndex: 'slug',
      key: 'slug',
      render: (slug) => (
        <Link to={`/topic${slug}`} className='italic underline text-blue-600'>
          {slug}
        </Link>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) =>
        topic.length >= 1 ? (
          <Popconfirm title='Bạn có muốn xóa chủ đề này không?' onConfirm={() => handleDelete(record.key)}>
            <a className='text-red-600 font-semibold'>Xóa</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = async (key) => {
    const newTopic = topic.filter((item) => item.key !== key);
    setTopic(newTopic);
    await deleteDoc(doc(db, 'topic', key));
  };
  useEffect(() => {
    document.title = 'TechEBlog | Quản lý chủ đề';
  }, []);
  //get topic in db
  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, 'topic');
      const q = query(colRef, where('status', '==', 1));
      const querySnapshot = await getDocs(q);
      let resultTopic = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        resultTopic.push({
          key: doc.id,
          name: doc.data().name,
          slug: '/' + slugify(doc.data().slug || doc.data().name, { lower: true }),
        });
      });
      setTopic(resultTopic);
      setRefresh(false);
    };
    fetchData();
  }, [refresh]);
  return (
    <TopicContainer className='min-h-[1000px]'>
      <TitleManage title='Thêm chủ đề' />
      <Formik initialValues={initialTopic} onSubmit={handleSubmit}>
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-2 gap-x-2'>
              <TopicInput label='Tên chủ đề' name='name' placeholder='Thêm chủ đề mới' />
              <TopicInput label='Đường dẫn' name='slug' placeholder='VD: vi-du-ten-tieu-de' />
              <TopicInput label='Chú thích' name='desc' placeholder='Giới thiệu về chủ đề' />
              <TopicInput
                type='checkbox'
                label='Liên quan'
                name='relative'
                choice={topic.map((item, index) => item.name)}
                className='flex flex-col'
              />
            </div>
            <div className='flex justify-end'>
              <NormalButton type='submit' title='Thêm chủ đề' className='py-2' />
            </div>
          </form>
        )}
      </Formik>
      <NormalButton
        title='Refresh'
        icon={<FontAwesomeIcon icon={faArrowsRotate} className='mr-1' />}
        onClick={() => setRefresh(true)}
        className='mt-5 mb-1'
      />
      {topic && <Table columns={columns} dataSource={topic} />}
    </TopicContainer>
  );
};

export default CreateTopic;
