import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookingById } from "../api/BookingAPI";
import api from "../api/axiosInstance";
import "../css/BookingRequest.css";

function BookingCancelRequest() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [message, setMessage] = useState("");
  const [latestRequestStatus, setLatestRequestStatus] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId);
        setBooking(data);

        // Lấy yêu cầu gần nhất (nếu có)
        const reqRes = await api.get("/bookingChangeRequests", {
          params: { bookingId, customerId: data.customerId._id, type: "Cancel" },
        });

        if (reqRes.data.length > 0) {
          const latest = reqRes.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )[0];
          if (latest.status !== "Pending") {
            setLatestRequestStatus(latest.status);
          }
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin booking:", err);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/bookings/bookingChangeRequests/cancel", {
        bookingId,
        cancellationReason,
      });
      setMessage("🎉 Gửi yêu cầu hủy thành công. Vui lòng chờ Admin phê duyệt.");
      setTimeout(() => navigate("/my-booking"), 2500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Lỗi gửi yêu cầu.");
    }
  };

  return (
    <div className="request-container">
      <h2>Yêu cầu hủy đặt phòng</h2>
      {latestRequestStatus && (
        <div className={`request-status status-${latestRequestStatus.toLowerCase()}`}>
          Trạng thái yêu cầu gần nhất: <strong>{latestRequestStatus}</strong>
        </div>
      )}
      {booking && (
        <form onSubmit={handleSubmit}>
          <label>
            Lý do hủy:
            <textarea
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder="Vui lòng nhập lý do hủy (nếu có)..."
              rows={4}
              required
            />
          </label>
          <button type="submit" className="btn-submit">
            Gửi yêu cầu hủy
          </button>
        </form>
      )}
      {message && <p className="request-message">{message}</p>}
    </div>
  );
}

export default BookingCancelRequest;
