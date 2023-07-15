import React from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
const BookingPage = () => {
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState('');
  const [timings, setTimings] = useState('');
  const [isAvailable, setIsAvailable] = useState();
  const getUserData = async () => {
    try {
      const res = await axios.post(
        '/api/v1/doctor/getDoctorById',
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data.success) {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
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
      <h3 className="text-center">Booking Page</h3>
      <div className="container m-2">
        {doctors && doctors.timings && (
          <div>
            <h4>
              DR. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees: {doctors.feesPerConsultation}</h4>
            <h4>
              Timings: {doctors.timings[0]} - {doctors.timings[1]}
            </h4>
            <div className="d-flex flex-column">
              <DatePicker
                className="m-2"
                format={'DD-MM-YYYY'}
                onChange={value => setDate(moment(value).format('DD-MM-YYYY'))}
              />
              <TimePicker.RangePicker
                className="m-2"
                format={'HH:mm'}
                onChange={values =>
                  setTimings([
                    moment(values[0]).format('HH:mm'),
                    moment(values[1]).format('HH:mm')
                  ])
                }
              />
              <button className="btn btn-primary mt-2">
                Check Availability
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default BookingPage;
