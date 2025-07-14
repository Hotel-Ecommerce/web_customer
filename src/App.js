import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

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

      {/* Trang chi tiết phòng - KHÔNG cần đăng nhập */}
      <Route
        path="/room/:id"
        element={
          <MainLayout>
            <RoomDetail />
          </MainLayout>
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

      {/* Đăng nhập / Đăng ký */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 404 */}
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

/*import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/room/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <RoomDetail />
            </MainLayout>
          </PrivateRoute>
        }
      />
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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:id" element={<PrivateRoute><RoomDetail /></PrivateRoute>} />
        <Route path="/my-booking" element={<PrivateRoute><BookingHistory /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div style={{ padding: "20px" }}><h2>404 - Page Not Found</h2></div>} />
    </Routes>
  );
}

export default App;




import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<PrivateRoute><RoomDetail /></PrivateRoute>} />
        <Route path="/my-booking" element={<PrivateRoute><BookingHistory /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div style={{ padding: "20px" }}><h2>404 - Page Not Found</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;
*/

