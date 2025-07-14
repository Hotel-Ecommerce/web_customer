import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css"; // Dùng chung cho Login & Register

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // GIẢ LẬP: nếu email trùng test@example.com → báo lỗi
    if (form.email === "test@example.com") {
      setError("Email đã tồn tại");
    } else {
      // Lưu giả token + id
      localStorage.setItem("token", "FAKE_TOKEN_AFTER_REGISTER");
      localStorage.setItem("customerId", "NEW_CUSTOMER_ID_002");

      alert("Đăng ký thành công!");
      navigate("/");
    }
    /*
    e.preventDefault();
    try {
        await axios.post("/signup", form);
        alert("Đăng ký thành công!");
        navigate("/login");
    } catch (err) {
        setError(err.response?.data?.message || "Đăng ký thất bại");
    }
    */
  };

  return (
    <div className="auth-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Họ tên"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Địa chỉ"
          value={form.address}
          onChange={handleChange}
        />
        <button type="submit">Đăng ký</button>
        {error && <div className="error">{error}</div>}
      </form>
      <p>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
}

export default Register;

/*import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../services/api";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/signup", form);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Họ tên" value={form.fullName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required />
        <input name="address" placeholder="Địa chỉ" value={form.address} onChange={handleChange} />
        <button type="submit">Đăng ký</button>
        {error && <div className="error">{error}</div>}
      </form>
      <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
    </div>
  );
}

export default Register;
*/