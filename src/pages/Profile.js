import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dữ liệu giả định sau khi đăng nhập
    const fakeUser = {
      fullName: "Nguyễn Văn A",
      email: "test@example.com",
      phone: "0123456789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
    };

    // Giả lập delay 500ms
    setTimeout(() => {
      setForm(fakeUser);
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Giả lập gửi thành công
    setTimeout(() => {
      setMessage("Cập nhật thành công!");
    }, 300);
  };

  if (loading) return <p style={{ padding: "20px" }}>Đang tải dữ liệu...</p>;

  return (
    <div className="profile-container">
      <h2>Thông tin cá nhân</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Họ tên"
          value={form.fullName}
          onChange={handleChange}
        />
        <input
          name="email"
          value={form.email}
          placeholder="Email"
          disabled
        />
        <input
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Địa chỉ"
          value={form.address}
          onChange={handleChange}
        />
        <button type="submit">Cập nhật</button>
      </form>
      {message && <p className="profile-message">{message}</p>}
    </div>
  );
}

export default Profile;


/* 
import React, { useEffect, useState } from "react";
import axios from "../services/api";
import "./Profile.css";

function Profile() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const customerId = localStorage.getItem("customerId");

  // Lấy thông tin người dùng
  useEffect(() => {
    const fetchProfile = async () => {
      if (!customerId) {
        setMessage("Không tìm thấy người dùng.");
        return;
      }

      try {
        const res = await axios.get(`/customers/${customerId}`);
        setForm(res.data);
        setMessage("");
      } catch (err) {
        console.error("Lỗi khi tải thông tin người dùng:", err);
        setMessage("Không thể tải thông tin.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [customerId]);

  // Cập nhật thông tin
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/customers/${customerId}`, {
        fullName: form.fullName,
        phone: form.phone,
        address: form.address,
      });

      setMessage("Cập nhật thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      setMessage("Cập nhật thất bại.");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  if (loading) return <p style={{ padding: "20px" }}>Đang tải dữ liệu...</p>;

  return (
    <div className="profile-container">
      <h2>Thông tin cá nhân</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Họ tên"
          value={form.fullName}
          onChange={handleChange}
        />
        <input name="email" value={form.email} disabled />
        <input
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Địa chỉ"
          value={form.address}
          onChange={handleChange}
        />
        <button type="submit">Cập nhật</button>
      </form>
      {message && <p className="profile-message">{message}</p>}
    </div>
  );
}

export default Profile;
*/
