import Layout from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const colums = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render: (text, record) => <span>{record.isDoctor ? 'Yes' : 'No'}</span>
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      )
    }
  ];

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Layout>
      <h1 className="text-center m-2">All Users</h1>
      <Table columns={colums} dataSource={users} />
    </Layout>
  );
};
export default Users;