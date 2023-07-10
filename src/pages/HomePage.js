import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

// Função para obter os dados do usuário
const getUserData = async () => {
  try {
    const res = await axios.get('//api/v1/user/getUserData', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

const HomePage = () => {
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  );
};

export default HomePage;
