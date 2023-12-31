import React from 'react';
import '../styles/LayoutStyles.css';
import { adminMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { Badge } from 'antd';
const Layout = ({ children }) => {
  const user = useSelector(state => state.user.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully');
    navigate('/login');
  };
  const userMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house'
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'fa-solid fa-calendar'
    },
    {
      name: 'Apply Doctor',
      path: '/apply-doctor',
      icon: 'fa-sharp fa-light fa-user-doctor'
    },
    {
      name: 'Profile',
      path: user && user._id ? `/user/profile/${user._id}` : '',
      icon: 'fa-regular fa-user'
    }
  ];

  //doctor menu
  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house'
    },
    {
      name: 'Appointments',
      path: '/doctor-appointments',
      icon: 'fa-solid fa-calendar'
    },

    {
      name: 'Profile',
      path: user && user._id ? `/doctor/profile/${user._id}` : '',
      icon: 'fa-regular fa-user'
    }
  ];

  //doctor menu
  // Renderização do menu
  const sidebarMenu =
    user && user.isAdmin
      ? adminMenu
      : user && user.isDoctor
      ? doctorMenu
      : userMenu;
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>WayOfLife</h6>
            <hr />
          </div>
          <div className="menu">
            {sidebarMenu.map(menu => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`menu-item ${isActive && 'active'}`}
                  key={menu.path}
                >
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className="menu-item" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content" style={{ cursor: 'pointer' }}>
              <Badge
                count={user && user.notification.length}
                onClick={() => {
                  navigate('/notification');
                }}
              >
                <i className="fa-solid fa-bell"></i>
              </Badge>
              <Link to="/">{user && user.name}</Link>{' '}
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
