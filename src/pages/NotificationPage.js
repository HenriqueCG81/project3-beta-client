import Layout from '../components/Layout';
import React from 'react';
import { Tabs, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';
import axios from 'axios';
const NotificationPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  //handle mark all read
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/get-all-notification',
        {
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
        const updatedUser = res.data.data;
        dispatch(setUser(updatedUser));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  //Delete Notification
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/delete-all-notification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        const updatedUser = res.data.data;
        dispatch(setUser(updatedUser));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong in notification');
    }
  };

  return (
    <Layout>
      <div>
        <h4 className="p-3 text-center">Notification Page</h4>
        <Tabs>
          <Tabs.TabPane tab="unRead" key={0}>
            <div className="d-flex justify-content-end">
              <h4
                className="p-2 text-primary"
                style={{ cursor: 'pointer' }}
                onClick={handleMarkAllRead}
              >
                Mark all Read
              </h4>
            </div>
            {user &&
              user.notification.map(notificationMsg => (
                <div className="card" key={notificationMsg._id}>
                  <div className="card-text">{notificationMsg.message}</div>
                </div>
              ))}
          </Tabs.TabPane>

          <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
              <h4
                className="p-2 text-primary"
                style={{ cursor: 'pointer' }}
                onClick={handleDeleteAllRead}
              >
                Delete all Read
              </h4>
            </div>
            {user &&
              user.seennotification.map(notificationMsg => (
                <div className="card" key={notificationMsg._id}>
                  <div className="card-text">{notificationMsg.message}</div>
                </div>
              ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NotificationPage;
