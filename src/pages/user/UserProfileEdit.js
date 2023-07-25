import React, { useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';

const UserProfileEdit = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async values => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/updateProfile`,
        {
          ...values,
          userId: user._id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/');
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <div className="profile-edit text-center">
        <h1>Edit User Profile</h1>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          name="profileEdit"
          initialValues={{ email: user.email }}
        >
          <Form.Item
            label="Email"
            name="email"
            required
            rules={[{ required: true, type: 'email' }]}
          >
            <Input type="email" placeholder="Your email" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default UserProfileEdit;
