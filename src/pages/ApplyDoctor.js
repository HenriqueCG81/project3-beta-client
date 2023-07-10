import Layout from '../components/Layout';
import React from 'react';
import { Form, Input, Row, Col, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
const ApplyDoctor = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async values => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/apply-doctor',
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.success);
        navigate('/');
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.log(error);
      message.error('something went wrong');
    }
  };

  return (
    <Layout>
      <h1 className="text-center">ApplyDoctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal Details :</h4>
        <Row gutter={20}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Phone"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="phone" placeholder="Your phone" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="Your email" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Website"
              name="website"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your website" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="address" placeholder="Your address" />
            </Form.Item>
          </Col>
        </Row>

        <h4 className="">Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your experience" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label="Fees Per Consultation"
              name="feesPerConsultation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your fees per consultation" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}></Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            {' '}
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
