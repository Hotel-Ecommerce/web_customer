import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { signout } from "../api/AuthAPI";
import styles from "./Header.module.css";

function Header() {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const avatarRef = useRef();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const customer = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = customer?.fullName || "Khách hàng";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    setOpen(false);
    navigate(path);
  };

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    try {
      await signout();
    } catch (e) {}
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("customerId");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          HOTEL BOOKING
        </Link>
      </div>

      <div className={styles.right}>
        {token ? (
          <div
            className={styles.avatarWrapper}
            ref={avatarRef}
            onClick={() => setOpen((prev) => !prev)}
            tabIndex={0}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="Avatar"
              className={styles.avatar}
            />
            <span className={styles.username}>{userName}</span>

            {open && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownItem} onClick={() => handleNavigate("/profile")}>
                  Thông tin cá nhân
                </div>
                <div className={styles.dropdownItem} onClick={() => handleNavigate("/my-booking")}>
                  Lịch sử đặt phòng
                </div>
                <div className={styles.dropdownItem} onClick={() => handleNavigate("/auth/changePassword")}>
                  Đổi mật khẩu
                </div>
                <div
                  className={styles.dropdownItem}
                  style={{ color: "#dc3545" }}
                  onClick={() => setShowLogoutModal(true)}
                >
                  Đăng xuất
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link to="/login" className={styles.authLink}>Đăng nhập</Link>
            <Link to="/signup" className={styles.authLink}>Đăng ký</Link>
          </div>
        )}
      </div>

      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đăng xuất</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn đăng xuất?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Huỷ
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Đăng xuất
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default Header;
