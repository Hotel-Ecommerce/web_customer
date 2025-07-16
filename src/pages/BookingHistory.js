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
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Phòng</th>
                <th>Loại</th>
                <th>Ngày nhận</th>
                <th>Ngày trả</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Thanh toán</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.roomId?.roomNumber || "N/A"}</td>
                  <td>{b.roomId?.type || "Chưa rõ"}</td>
                  <td>{formatDate(b.checkInDate)}</td>
                  <td>{formatDate(b.checkOutDate)}</td>
                  <td>{formatDate(b.createdAt)}</td>
                  <td>
                    <span
                      style={{
                        color:
                          b.status === "Cancelled"
                            ? "red"
                            : b.status === "Pending"
                            ? "#ff9800"
                            : "green",
                        fontWeight: 600,
                      }}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        color:
                          b.paymentStatus === "Paid"
                            ? "green"
                            : b.paymentStatus === "Refunded"
                            ? "orange"
                            : "red",
                        fontWeight: 600,
                      }}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td>{b.totalPrice?.toLocaleString()} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookingHistory;
