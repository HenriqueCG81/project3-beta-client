import React from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker, message } from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { useSelector } from 'react-redux';
import moment from 'moment';
const BookingPage = () => {
  const { user } = useSelector(state => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/doctor/getDoctorById`,
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

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/booking-availability`,
        { doctorId: params.doctorId, date: date, time: time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        setIsAvailable(false);
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      if (!date || !time) {
        message.error('Please select date and time');
        return;
      }
      dispatch(showLoading());

      const availabilityRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/booking-availability`,
        { doctorId: params.doctorId, date: date, time: time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (!availabilityRes.data.success) {
        // Se a resposta indicar que o horário não está disponível
        message.error(availabilityRes.data.message);
        dispatch(hideLoading());
        return;
      }

      if (!availabilityRes.data.isAvailable) {
        // Se o horário não estiver disponível
        message.error('Doctor is not available at this time');
        dispatch(hideLoading());
        return;
      }

      // Horário está disponível, prossegue com a marcação
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: {
            _id: doctors._id,
            userId: doctors.userId,
            firstName: doctors.firstName,
            lastName: doctors.lastName,
            phone: doctors.phone
          },
          userInfo: user,
          date: date,
          time: time
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
      }
    } catch (error) {
      dispatch(hideLoading());
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
              Timings: {moment(doctors.timings[0]).format('HH:mm')} -{' '}
              {moment(doctors.timings[1]).format('HH:mm')}
            </h4>
            <div className="d-flex flex-column">
              <DatePicker
                className="m-2"
                format={'DD-MM-YYYY'}
                onChange={value => setDate(value.format('DD-MM-YYYY'))}
              />
              <TimePicker
                className="m-2"
                format={'HH:mm'}
                onChange={value => setTime(value.format('HH:mm'))}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
                type="submit"
              >
                Check Availability
              </button>

              <button
                className="btn btn-dark mt-2"
                onClick={handleBooking}
                type="submit"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
