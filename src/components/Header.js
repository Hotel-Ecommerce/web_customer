import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customerId");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"> Quản lý khách sạn UIT </Link>
      </div>

      <nav className="nav">
        <Link to="/">Tìm phòng</Link>

        {token && <Link to="/my-booking">Lịch sử đặt phòng</Link>}
        {token && <Link to="/profile">Trang cá nhân</Link>}

        {!token && <Link to="/login">Đăng nhập</Link>}

        {token && (
          <button className="logout-btn" onClick={handleLogout}>
            Đăng xuất
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;

/*import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customerId');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"> Quản lý khách sạn UIT </Link>
      </div>

      <nav className="nav">
        <Link to="/"> Tìm phòng </Link>
        {token && <Link to="/my-booking"> Lịch sử đặt phòng </Link>}
        {!token && <Link to="/login"> Đăng nhập </Link>}
        {token && (
          <button onClick={handleLogout} className="logout-btn">
            Đăng xuất
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
*/

