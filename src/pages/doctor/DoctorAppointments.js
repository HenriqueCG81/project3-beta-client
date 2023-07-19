import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, message } from 'antd';
const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/doctor/doctor-appointments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/doctor/update-status`,
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id'
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      render: (text, record) => (
        <span>
          {record.date} {record.time}
        </span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'pending' && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, 'approved')}
              >
                Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleStatus(record, 'rejected')}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      )
    }
  ];
  return (
    <Layout>
      <h1 className="text-center">Appointments List</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;
