import { Badge, Table } from 'antd';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TitleManage } from '../../components/ManageModule';
import { useAuth } from '../../contexts/auth-context';
import { db } from '../../firebase-app/firebase-config';
import { getTime } from '../../utils/time';

function ChooseUpdate() {
  const { userInfo } = useAuth();
  const [myBlogs, setMyBlogs] = useState([]);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    if (!userInfo) return;
    const fetchData = async () => {
      try {
        const blogRef = collection(db, 'blogs');
        const blogQuery = query(blogRef, where('user.id', '==', userInfo.uid));
        const blogSnapshot = await getDocs(blogQuery);
        const blogResult = [];
        blogSnapshot.forEach((doc) => {
          blogResult.push({
            blogID: doc.id,
            ...doc.data(),
            updatedAt: getTime(doc.data()?.updatedAt?.seconds || doc.data().createdAt.seconds),
          });
        });
        setMyBlogs(blogResult);
        setColumns([
          {
            title: 'Tiêu đề',
            dataIndex: 'titleBlog',
            render: (_, record) => {
              return (
                <Link
                  to={`/quan-ly/chinh-sua-bai-viet/${record.blogID}`}
                  className='text-sm font-semibold text-blue-600'
                >
                  {record.titleBlog}
                </Link>
              );
            },
          },
          {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (_, record) => {
              let statusBlog;
              switch (record.status) {
                case 1:
                  statusBlog = (
                    <span>
                      <Badge status='success' />
                      Đã phê duyệt
                    </span>
                  );
                  break;
                case 2:
                  statusBlog = (
                    <span>
                      <Badge status='warning' />
                      Chưa phê duyệt
                    </span>
                  );
                  break;
                case 3:
                  statusBlog = (
                    <span>
                      <Badge status='error' />
                      Bị từ chối
                    </span>
                  );
                  break;
                default:
                  break;
              }
              return myBlogs && statusBlog;
            },
          },
          {
            title: 'Ngày chỉnh sửa',
            dataIndex: 'updatedAt',
          },
        ]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <div className='min-h-[75vh]'>
      <TitleManage title='Cập nhật bài viết' />
      <Table columns={columns} dataSource={myBlogs} className='mt-6' />
    </div>
  );
}

export default ChooseUpdate;
