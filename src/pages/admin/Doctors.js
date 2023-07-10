import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);
  return (
    <Layout>
      <h1>All Doctors</h1>
    </Layout>
  );
};
export default Doctors;
