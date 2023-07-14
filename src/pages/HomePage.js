import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';

// Função para obter os dados do usuário
const getUserData = async () => {
  try {
    const res = await axios.get('/api/v1/user/getAllDoctors', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      if (data) {
        setDoctors(data);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors &&
          doctors.map(doctor => {
            return <DoctorList key={doctor.id} doctor={doctor} />;
          })}
      </Row>
    </Layout>
  );
};

export default HomePage;
