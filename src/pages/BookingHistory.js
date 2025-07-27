import React, { useEffect, useState } from "react";
import { getBookingsByCustomer } from "../api/BookingAPI";
import "./BookingHistory.css";

function BookingHistory() {
  const customerId = localStorage.getItem("customerId");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookingsByCustomer(customerId);
        setBookings(data);
        setError("");
      } catch (err) {
        setBookings([]);
        setError("Không thể tải dữ liệu đặt phòng. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    if (customerId) fetchBookings();
    else {
      setError("Bạn chưa đăng nhập.");
      setLoading(false);
    }
  }, [customerId]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("vi-VN");

  return (
    <div className="booking-history">
      <h2>Lịch sử đặt phòng</h2>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : bookings.length === 0 ? (
        <p>Không có đặt phòng nào.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <div className="booking-header">
                <span className="room-type">{b.roomId?.type}</span>
                <span className="room-number">Phòng {b.roomId?.roomNumber}</span>
              </div>
              <div className="booking-dates">
                <p>
                  <strong>Nhận phòng:</strong> {formatDate(b.checkInDate)}
                </p>
                <p>
                  <strong>Trả phòng:</strong> {formatDate(b.checkOutDate)}
                </p>
                <p>
                  <strong>Ngày đặt:</strong> {formatDate(b.createdAt)}
                </p>
              </div>
              <div className="booking-status">
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  <span className={`status ${b.status.toLowerCase()}`}>
                    {b.status}
                  </span>
                </p>
                <p>
                  <strong>Thanh toán:</strong>{" "}
                  <span
                    className={`payment ${b.paymentStatus.toLowerCase()}`}
                  >
                    {b.paymentStatus}
                  </span>
                </p>
                <p>
                  <strong>Tổng tiền:</strong>{" "}
                  <span className="price">
                    {b.totalPrice?.toLocaleString()} đ
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingHistory;
