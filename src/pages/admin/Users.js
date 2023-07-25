import Layout from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/getAllUsers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async userId => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/deleteUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data.success) {
        // Remove the deleted user from the local state
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      } else {
        // Handle error, show error message or notification
        console.log(res.data.message);
      }
    } catch (error) {
      // Handle error, show error message or notification
      console.log(error);
    }
  };

  const columns = [
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
          {/* Add onClick event for the delete action */}
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </button>
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
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};
export default Users;
