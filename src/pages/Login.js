import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css"; // Dùng chung cho Login và Register

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // GIẢ LẬP LOGIN
    const fakeUser = {
      email: "test@example.com",
      password: "123456",
      token: "FAKE_TOKEN_123",
      customerId: "FAKE_CUSTOMER_ID_001",
    };

    if (form.email === fakeUser.email && form.password === fakeUser.password) {
      localStorage.setItem("token", fakeUser.token);
      localStorage.setItem("customerId", fakeUser.customerId);
      navigate("/"); // Chuyển về trang chủ
    } else {
      setError("Sai email hoặc mật khẩu");
    }

    /*
    e.preventDefault();
    try {
        const res = await axios.post("/login", form);
        const { token, customer } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("customerId", customer._id);

        navigate("/");
    } catch (err) {
        setError(err.response?.data?.message || "Sai tài khoản hoặc mật khẩu");
    }
    */
  };

  return (
    <div className="auth-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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
        <button type="submit">Đăng nhập</button>
        {error && <div className="error">{error}</div>}
      </form>
      <p>
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </div>
  );
}

export default Login;

/*import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../services/api";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", form);
      const { token, customer } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("customerId", customer._id);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required />
        <button type="submit">Đăng nhập</button>
        {error && <div className="error">{error}</div>}
      </form>
      <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
    </div>
  );
}

export default Login;
*/
