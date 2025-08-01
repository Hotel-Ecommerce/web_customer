import React, { useEffect, useState } from "react";
import { getBookingsByCustomer } from "../api/BookingAPI";
import { useNavigate } from "react-router-dom";
import "../css/BookingHistory.css";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getBookingsByCustomer();
        setBookings(data);
      } catch (error) {
        console.error("Lỗi khi tải booking:", error);
      } finally {
        setIsLoading(false);
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

  const today = new Date();

  return (
    <div className="booking-history-container">
      <h2 className="booking-title">Lịch sử đặt phòng</h2>

      {isLoading ? (
        <div className="loading-wrapper">
          <img
            src="https://i.gifer.com/ZZ5H.gif"
            alt="Đang tải..."
            width="60"
            height="60"
          />
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : bookings.length === 0 ? (
        <p>Không có lịch sử đặt phòng nào.</p>
      ) : (
        <>
          {currentBookings.map((booking) => {
            const room = booking.room || {};
            const checkInDate = new Date(booking.checkInDate);
            const isPastCheckIn = checkInDate < today;

            return (
              <div key={booking._id} className="booking-card">
                <div className="booking-main">
                  <div className="booking-left">
                    <div className="booking-header">
                      <div className="room-type">{room.type || "Phòng"}</div>
                      <div className="room-number">Phòng {room.roomNumber || "?"}</div>
                    </div>

                    <div className="booking-info">
                      <p>
                        Nhận phòng: <strong>{isNaN(checkInDate) ? "-" : checkInDate.toLocaleDateString()}</strong>
                      </p>
                      <p>
                        Trả phòng:{" "}
                        <strong>
                          {booking.checkOutDate
                            ? new Date(booking.checkOutDate).toLocaleDateString()
                            : "-"}
                        </strong>
                      </p>
                      <p>
                        Ngày đặt:{" "}
                        <strong>
                          {booking.createdAt
                            ? new Date(booking.createdAt).toLocaleDateString()
                            : "-"}
                        </strong>
                      </p>
                      <p>
                        Trạng thái:{" "}
                        <strong
                          className={
                            booking.status === "Confirmed"
                              ? "status confirmed"
                              : booking.status === "Pending"
                              ? "status pending"
                              : "status cancelled"
                          }
                        >
                          {booking.status || "-"}
                        </strong>
                      </p>
                      <p>
                        Thanh toán:{" "}
                        <strong
                          className={
                            booking.paymentStatus === "Paid"
                              ? "payment paid"
                              : booking.paymentStatus === "Refunded"
                              ? "payment refunded"
                              : "payment unpaid"
                          }
                        >
                          {booking.paymentStatus || "-"}
                        </strong>
                      </p>
                      <p>
                        Tổng tiền:{" "}
                        <strong className="price">
                          {typeof booking.totalPrice === "number"
                            ? booking.totalPrice.toLocaleString() + " đ"
                            : "-"}
                        </strong>
                      </p>
                    </div>
                  </div>

                  <div className="booking-right">
                    {Array.isArray(room.images) && room.images[0] && (
                      <div className="booking-img">
                        <img
                          src={`https://hotel-api.phuongtran.site${room.images?.[0]}`} 
                          alt="Room"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* nút nằm dưới, căn giữa toàn bộ card */}
                {booking.status === "Confirmed" && !isPastCheckIn && (
                  <div className="booking-actions-center">
                    <button
                      onClick={() => handleRequestChange(booking._id)}
                      className="btn-change"
                    >
                      Thay đổi
                    </button>
                    <button
                      onClick={() => handleRequestCancel(booking._id)}
                      className="btn-cancel"
                    >
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            );
          })}

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
