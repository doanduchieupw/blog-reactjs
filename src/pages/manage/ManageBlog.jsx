import { useEffect, useState, useRef } from 'react';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase-app/firebase-config';
import { TitleManage } from '../../components/ManageModule';
import 'antd/dist/antd.css';
import { SearchOutlined } from '@ant-design/icons';
import { Badge, Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { blogStatus } from '../../utils/constants';

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [columns, setColumns] = useState();
  const [loading, setLoading] = useState(false);
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
  const handleAproved = async (key) => {
    try {
      const blogRef = doc(db, 'blogs', key);
      await updateDoc(blogRef, {
        status: blogStatus.ACCEPTED,
      });
      const cloneBlogs = [...blogs];
      const indexBlog = cloneBlogs.findIndex((blog) => blog.key === key);
      cloneBlogs[indexBlog].statusBlog = blogStatus.ACCEPTED;
      setBlogs(cloneBlogs);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (key) => {
    try {
      const blogRef = doc(db, 'blogs', key);
      await updateDoc(blogRef, {
        status: blogStatus.REJECTED,
      });
      const cloneBlogs = [...blogs];
      const indexBlog = cloneBlogs.findIndex((blog) => blog.key === key);
      cloneBlogs[indexBlog].statusBlog = blogStatus.REJECTED;
      setBlogs(cloneBlogs);
    } catch (err) {
      console.log(err);
    }
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
          placeholder={`T??m ki???m ${dataIndex}`}
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
              width: 100,
            }}
          >
            T??m ki???m
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 50,
            }}
          >
            X??a
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
            L???c
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text, record) =>
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
        <p>
          {dataIndex === 'titleBlog' ? (
            <Link to={`/vn/${record.slug}`} className='font-semibold text-blue-700'>
              {text}
            </Link>
          ) : (
            <Link to={`/${record.user.id}`}>{text}</Link>
          )}
        </p>
      ),
  });
  useEffect(() => {
    document.title = 'TechEBlog | Qu???n l?? b??i vi???t';
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const blogRef = collection(db, 'blogs');
      const querySnapshot = await getDocs(blogRef);
      let blogList = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        blogList.push({
          key: doc.id,
          titleBlog: doc.data().titleBlog,
          slug: doc.data().slugBlog,
          authorBlog: doc.data().user.displayName,
          topicBlog: doc.data().topic,
          statusBlog: doc.data().status,
          createdAtBlog: moment.unix(doc.data().createdAt.seconds).format('DD-MM-YYYY hh:mm'),
          time: doc.data().createdAt.seconds,
          user: doc.data().user,
        });
      });
      setBlogs(blogList);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const topicRef = collection(db, 'topic');
      const topicQuery = query(topicRef, where('status', '==', 1));
      const querySnapshot = await getDocs(topicQuery);
      let resultTopic = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        resultTopic.push({
          key: doc.id,
          text: doc.data().name,
          value: doc.data().name,
        });
      });
      setColumns([
        {
          title: 'Ti??u ?????',
          dataIndex: 'titleBlog',
          key: 'titleBlog',
          width: '25%',
          ...getColumnSearchProps('titleBlog'),
        },
        {
          title: 'T??c gi???',
          dataIndex: 'authorBlog',
          key: 'authorBlog',
          width: '12%',
          ...getColumnSearchProps('authorBlog'),
        },
        {
          title: 'Ch??? ?????',
          dataIndex: 'topicBlog',
          key: 'topicBlog',
          width: '10%',
          filters: resultTopic,
          onFilter: (value, record) => record.topicBlog.indexOf(value) === 0,
        },
        {
          title: 'Tr???ng th??i',
          dataIndex: 'statusBlog',
          key: 'statusBlog',
          width: '12%',
          render: (_, record) => {
            let statusBlog;
            switch (record.statusBlog) {
              case 1:
                statusBlog = (
                  <span>
                    <Badge status='success' />
                    ???? ph?? duy???t
                  </span>
                );
                break;
              case 2:
                statusBlog = (
                  <span>
                    <Badge status='warning' />
                    Ch??a ph?? duy???t
                  </span>
                );
                break;
              case 3:
                statusBlog = (
                  <span>
                    <Badge status='error' />
                    B??? t??? ch???i
                  </span>
                );
                break;
              default:
                break;
            }
            return blogs && statusBlog;
          },
          filters: [
            {
              text: '???? ph?? duy???t',
              value: 1,
            },
            {
              text: 'Ch??a ph?? duy???t',
              value: 2,
            },
            {
              text: 'B??? t??? ch???i',
              value: 3,
            },
          ],
          onFilter: (value, record) => record.statusBlog === value,
        },
        {
          title: 'H??nh ?????ng',
          dataIndex: 'actionBlog',
          key: 'actionBlog',
          width: '20%',
          render: (_, record) => (
            <div className='flex gap-x-1 text-white'>
              <button className='bg-blue-500 rounded-md p-1 -ml-1' onClick={() => handleAproved(record.key)}>
                Ph?? duy???t
              </button>
              <button className='bg-red-500 rounded-md p-1 -mr-1' onClick={() => handleReject(record.key)}>
                T??? ch???i
              </button>
            </div>
          ),
        },
        {
          title: 'Th???i gian',
          dataIndex: 'createdAtBlog',
          key: 'createdAtBlog',
          sorter: (a, b) => a.time - b.time,
          sortDirections: ['descend', 'ascend'],
        },
      ]);
    };
    fetchData();
  }, [blogs]);
  return (
    <div>
      <TitleManage title='Qu???n l?? n???i dung' />
      {<Table columns={columns} dataSource={blogs} loading={loading} />}
    </div>
  );
};

export default ManageBlog;
