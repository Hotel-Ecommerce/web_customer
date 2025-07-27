import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookingById } from "../api/BookingAPI";
import api from "../api/axiosInstance";
import "./BookingRequest.css";

function BookingChangeRequest() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId);
        setBooking(data);
        setRoomId(data.roomId._id);
        setCheckInDate(data.checkInDate.slice(0, 10));
        setCheckOutDate(data.checkOutDate.slice(0, 10));
      } catch (error) {
        console.error("Lỗi lấy dữ liệu booking:", error);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/bookings/bookingChangeRequests/update", {
        bookingId,
        requestedRoomId: roomId,
        requestedCheckInDate: checkInDate,
        requestedCheckOutDate: checkOutDate,
      });
      setMessage("🎉 Gửi yêu cầu thay đổi thành công. Vui lòng chờ Admin phê duyệt.");
      setTimeout(() => navigate("/my-booking"), 2500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Lỗi gửi yêu cầu.");
    }
  };

  return (
    <div className="request-container">
      <h2>Yêu cầu thay đổi đặt phòng</h2>
      {booking && (
        <form onSubmit={handleSubmit}>
          <label>
            Ngày nhận phòng mới:
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
            />
          </label>
          <label>
            Ngày trả phòng mới:
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="btn-submit">Gửi yêu cầu thay đổi</button>
        </form>
      )}
      {message && <p className="request-message">{message}</p>}
    </div>
  );
}

export default BookingChangeRequest;
