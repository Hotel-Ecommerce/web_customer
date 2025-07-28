import React, { useEffect, useState } from "react";
import { getCustomerById, updateCustomer } from "../api/CustomerAPI";
import "../css/Profile.css";

function Profile() {
  const customerId = localStorage.getItem("customerId");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!customerId) {
      console.error("Không tìm thấy customerId");
      return;
    }
    const fetchProfile = async () => {
      try {
        const data = await getCustomerById(customerId);
        setForm(data);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin:", err);
        setMessage("Không thể tải thông tin.");
      }
    };
    fetchProfile();
  }, [customerId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, id: customerId };
      await updateCustomer(payload);
      setMessage("✅ Cập nhật thành công!");

      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...currentUser, ...form };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err.response || err);
      setMessage("❌ Lỗi khi cập nhật.");
    }
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">Thông tin tài khoản</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Họ và tên</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Nhập họ và tên"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" value={form.email} disabled />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="form-group">
          <label>Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Nhập địa chỉ"
          />
        </div>

        <button className="btn-submit" type="submit">
          Cập nhật thông tin
        </button>

        {message && <p className="profile-message">{message}</p>}
      </form>
    </div>
  );
}

export default Profile;

