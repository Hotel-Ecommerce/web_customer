import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookingById } from "../api/BookingAPI";
import { getAllRooms } from "../api/RoomAPI"; 
import api from "../api/axiosInstance";
import "../css/BookingRequest.css";

function BookingChangeRequest() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [latestRequestStatus, setLatestRequestStatus] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  // Lấy danh sách phòng
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms");
        setRooms(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh sách phòng:", err);
      }
    };
    fetchRooms();
  }, []);

  // Lấy thông tin booking và yêu cầu gần nhất (nếu có)
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId);
        setBooking(data);
        setRoomId(data.roomId._id);
        setCheckInDate(data.checkInDate.slice(0, 10));
        setCheckOutDate(data.checkOutDate.slice(0, 10));

        const roomList = await getAllRooms();
        setRooms(roomList);

        // Lấy yêu cầu gần nhất (nếu có)
        const reqRes = await api.get("/bookingChangeRequests", {
          params: { bookingId, customerId: data.customerId._id },
        });

        if (reqRes.data.length > 0) {
          const latest = reqRes.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )[0];
          if (latest.status !== "Pending") {
            setLatestRequestStatus(latest.status);
          }
        }
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
      {latestRequestStatus && (
        <div className={`request-status status-${latestRequestStatus.toLowerCase()}`}>
          Trạng thái yêu cầu gần nhất: <strong>{latestRequestStatus}</strong>
        </div>
      )}
      {booking && (
        <form onSubmit={handleSubmit}>
          <label>
            Ngày nhận phòng mới:
            <input
              type="date"
              value={checkInDate}
              min={today}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
            />
          </label>
          <label>
            Ngày trả phòng mới:
            <input
              type="date"
              value={checkOutDate}
              min={checkInDate || today}
              onChange={(e) => setCheckOutDate(e.target.value)}
              required
            />
          </label>
          <label>
            Phòng mới:
            <select value={roomId} onChange={(e) => setRoomId(e.target.value)} required>
              <option value="">-- Chọn phòng --</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.roomNumber} - {room.type} - {room.price.toLocaleString()}đ/đêm
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn-submit">
            Gửi yêu cầu thay đổi
          </button>
        </form>
      )}
      {message && <p className="request-message">{message}</p>}
    </div>
  );
}

export default BookingChangeRequest;
