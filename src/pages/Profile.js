import React, { useEffect, useState } from "react";
import { getCustomerById, updateCustomer } from "../api/CustomerAPI";
import "./Profile.css";

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
  //
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, id: customerId }; // gửi id
      await updateCustomer(payload);
      setMessage("Cập nhật thành công!");

      // ✅ Cập nhật lại localStorage
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...currentUser, ...form }; // giữ token, cập nhật tên, phone, address
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err.response || err);
      setMessage("Lỗi khi cập nhật.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Thông tin cá nhân</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Họ tên" />
        <input name="email" value={form.email} disabled />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Số điện thoại" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ" />
        <button type="submit">Cập nhật</button>
      </form>
      {message && <p className="profile-message">{message}</p>}
    </div>
  );
}

export default Profile;

