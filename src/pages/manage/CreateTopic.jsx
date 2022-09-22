import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Formik } from 'formik';
import { Popconfirm, Space, Table, Tag } from 'antd';

import { BlogInput as TopicInput } from '../../components/Input';
import { TitleManage } from '../../components/ManageModule';
import { db } from '../../firebase-app/firebase-config';

const initialTopic = {
  name: '',
  status: 1,
  slug: '',
};

const handleSubmit = async (values) => {
  console.log(
    '🚀 ~ file: CreateTopic.jsx ~ line 11 ~ handleSubmit ~ values',
    values
  );
};

const CreateTopic = () => {
  const [topic, setTopic] = useState([]);

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
    },
    {
      title: 'Đường dẫn',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
          topic.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  
  const handleDelete = (key) => {
    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
    console.log('delete');
  };
  
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
          slug: '/' + doc.data().slug,
        });
      });
      setTopic(resultTopic);
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-[1000px]">
      <TitleManage title="Thêm chủ đề" />
      <Formik initialValues={initialTopic} onSubmit={handleSubmit}>
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-x-2">
              <TopicInput
                label="Tên chủ đề"
                name="name"
                placeholder="Thêm chủ đề mới"
              />
              <TopicInput
                label="Đường dẫn"
                name="slug"
                placeholder="VD: vi-du-ten-tieu-de"
              />
            </div>
            <button>Submit</button>
          </form>
        )}
      </Formik>
      {topic && <Table columns={columns} dataSource={topic} />}
    </div>
  );
};

export default CreateTopic;
