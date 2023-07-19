import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import { Form, Input, Row, Col, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import moment from 'moment';

const Profile = () => {
  const { user } = useSelector(state => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  dayjs.locale('pt-br');

  const handleFinish = async values => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/doctor/updateProfile',
        {
          ...values,
          userId: user._id,
          timings: [
            values.timings[0].format('HH:mm'),
            values.timings[1].format('HH:mm')
          ]
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

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        `/api/v1/doctor/getDoctorInfo`,
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  return (
    <Layout>
      <div className="profile text-center">
        <h1>Manage Doctor Profile</h1>
        {doctor && (
          <Form
            layout="vertical"
            onFinish={handleFinish}
            className="m-3"
            name="timings"
            initialValues={{
              ...doctor,
              timings: [
                moment(doctor.timings[0], 'HH:mm'),
                moment(doctor.timings[1], 'HH:mm')
              ]
            }}
          >
            <h4 className="">Personal Details:</h4>
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

            <h4 className="">Professional Details:</h4>
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
                <button className="btn btn-primary form-btn" type="submit">
                  Update
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
