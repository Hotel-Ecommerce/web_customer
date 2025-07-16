import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");

  const token = localStorage.getItem("token");
  const customer = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (customer && customer.fullName) {
      setUserName(customer.fullName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customerId");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"> Khách sạn UIT </Link>
      </div>

      <nav className="nav">
        {token ? (
          <>
            <Link to="/">Tìm phòng</Link>
            <div className="user-menu">
              <div className="user-icon" onClick={toggleDropdown}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  alt="user"
                />
                <span>{userName}</span>
              </div>

              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile">Thông tin cá nhân</Link>
                  <Link to="/my-booking">Lịch sử đặt phòng</Link>
                  <Link to="/change-password">Đổi mật khẩu</Link>
                  <button onClick={handleLogout} className="logout-btn">
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/signup">Đăng ký</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
