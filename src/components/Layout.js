import React from 'react';
import '../styles/LayoutStyles.css';
import { adminMenu, userMenu } from '../Data/data';
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

  // Renderização do menu
  const sidebarMenu = user && user.isAdmin ? adminMenu : userMenu;

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
              <Link to="/profile">{user && user.name}</Link>{' '}
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
