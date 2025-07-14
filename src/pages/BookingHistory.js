import React, { useEffect, useState } from "react";
import "./BookingHistory.css";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập dữ liệu lịch sử đặt phòng
    const fakeBookings = [
      {
        _id: "b001",
        roomNumber: "101",
        roomType: "Deluxe",
        checkInDate: "2025-07-15",
        checkOutDate: "2025-07-18",
        totalPrice: 3000000,
        status: "Confirmed",
        paymentStatus: "Paid",
      },
      {
        _id: "b002",
        roomNumber: "205",
        roomType: "Standard",
        checkInDate: "2025-06-01",
        checkOutDate: "2025-06-03",
        totalPrice: 1600000,
        status: "Cancelled",
        paymentStatus: "Refunded",
      },
    ];

    // Giả lập delay tải dữ liệu
    setTimeout(() => {
      setBookings(fakeBookings);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="booking-history">
      <h2>Lịch sử đặt phòng</h2>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : bookings.length === 0 ? (
        <p>Không có đặt phòng nào.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Phòng</th>
              <th>Loại</th>
              <th>Ngày nhận</th>
              <th>Ngày trả</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.roomNumber}</td>
                <td>{b.roomType}</td>
                <td>{new Date(b.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(b.checkOutDate).toLocaleDateString()}</td>
                <td>{b.status}</td>
                <td>{b.paymentStatus}</td>
                <td>{b.totalPrice.toLocaleString()} đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingHistory;

/*
import React, { useEffect, useState } from "react";
import axios from "../services/api";
import "./BookingHistory.css";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      setMessage("Không tìm thấy người dùng.");
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get("/bookings/list", {
          params: { customerId },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy lịch sử đặt phòng:", err);
        setMessage("Không thể tải lịch sử.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-history">
      <h2>Lịch sử đặt phòng</h2>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : message ? (
        <p>{message}</p>
      ) : bookings.length === 0 ? (
        <p>Không có đặt phòng nào.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Phòng</th>
              <th>Loại</th>
              <th>Ngày nhận</th>
              <th>Ngày trả</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.roomId?.roomNumber || "N/A"}</td>
                <td>{b.roomId?.type || "N/A"}</td>
                <td>{new Date(b.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(b.checkOutDate).toLocaleDateString()}</td>
                <td>{b.status}</td>
                <td>{b.paymentStatus}</td>
                <td>{b.totalPrice?.toLocaleString()} đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingHistory;



*/



