import React, { useEffect, useState } from "react";
import { getBookingsByCustomer } from "../api/BookingAPI";
import { useNavigate } from "react-router-dom";
import "../css/BookingHistory.css";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookingsByCustomer();
        setBookings(data);
      } catch (error) {
        console.error("Lỗi khi tải booking:", error);
      }
    };

    fetchData();
  }, []);

  const handleRequestChange = (bookingId) => {
    navigate(`/booking-change/${bookingId}`);
  };

  const handleRequestCancel = (bookingId) => {
    navigate(`/booking-cancel/${bookingId}`);
  };

  // Tính số trang
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="booking-history-container">
      <h2 className="booking-title">Lịch sử đặt phòng</h2>

      {bookings.length === 0 ? (
        <p>Không có lịch sử đặt phòng nào.</p>
      ) : (
        <>
          {currentBookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <strong>{booking.roomId?.type || "Phòng"}</strong>
                <span>Phòng {booking.roomId?.roomNumber || "?"}</span>
              </div>
              <div className="booking-info">
                <p>
                  Nhận phòng:{" "}
                  <strong>{new Date(booking.checkInDate).toLocaleDateString()}</strong>
                </p>
                <p>
                  Trả phòng:{" "}
                  <strong>{new Date(booking.checkOutDate).toLocaleDateString()}</strong>
                </p>
                <p>
                  Ngày đặt:{" "}
                  <strong>{new Date(booking.createdAt).toLocaleDateString()}</strong>
                </p>
                <p>
                  Trạng thái:{" "}
                  <strong style={{ color: "green" }}>{booking.status}</strong>
                </p>
                <p>
                  Thanh toán:{" "}
                  <strong style={{ color: booking.paymentStatus === "Paid" ? "green" : "red" }}>
                    {booking.paymentStatus}
                  </strong>
                </p>
                <p>
                  Tổng tiền:{" "}
                  <strong style={{ color: "darkred" }}>
                    {booking.totalPrice.toLocaleString()} đ
                  </strong>
                </p>
              </div>

              {booking.status === "Confirmed" && (
                <div className="booking-actions">
                  <button onClick={() => handleRequestChange(booking._id)} className="btn-change">
                    Yêu cầu thay đổi
                  </button>
                  <button onClick={() => handleRequestCancel(booking._id)} className="btn-cancel">
                    Yêu cầu hủy
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* PHÂN TRANG */}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              &lt; Trước
            </button>
            <span>
              Trang {currentPage} / {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Tiếp &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingHistory;
