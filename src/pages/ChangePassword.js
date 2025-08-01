import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css"; // Dùng lại form style
import { changePassword } from "../api/CustomerAPI";

function ChangePassword() {
  const navigate = useNavigate();
  //const customerId = localStorage.getItem("customerId");
  //const user = JSON.parse(localStorage.getItem("user") || "{}");
  //const customerId = user._id;
  
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = form;

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới không khớp.");
      return;
    }

    try {
      await changePassword({ currentPassword: form.oldPassword, newPassword: form.newPassword });
      setMessage("Đổi mật khẩu thành công!");
      setError("");
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi khi đổi mật khẩu");
      setMessage("");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="oldPassword"
          placeholder="Mật khẩu hiện tại"
          value={form.oldPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Mật khẩu mới"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu mới"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Cập nhật</button>
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
      </form>
    </div>
  );
}

export default ChangePassword;
