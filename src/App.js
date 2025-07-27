import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import PaymentPage from "./pages/PaymentPage";

import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Routes>
      {/* Trang chủ */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      {/* Trang chi tiết phòng */}
      <Route
        path="/room/:id"
        element={
          <MainLayout>
            <RoomDetail />
          </MainLayout>
        }
      />

      {/* ✅ Trang thanh toán có tham số bookingId */}
      <Route
        path="/payment/:bookingId"
        element={
          <PrivateRoute>
            <MainLayout>
              <PaymentPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Lịch sử đặt phòng */}
      <Route
        path="/my-booking"
        element={
          <PrivateRoute>
            <MainLayout>
              <BookingHistory />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Trang cá nhân */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Đổi mật khẩu */}
      <Route
        path="/change-password"
        element={
          <PrivateRoute>
            <MainLayout>
              <ChangePassword />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Đăng nhập / Đăng ký */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 404 Not Found */}
      <Route
        path="*"
        element={
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>404 - Không tìm thấy trang</h2>
            <p>Vui lòng kiểm tra lại đường dẫn.</p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
