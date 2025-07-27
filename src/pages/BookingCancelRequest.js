import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import "./BookingRequest.css";

function BookingCancelRequest() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/bookings/bookingChangeRequests/cancel", {
        bookingId,
        cancellationReason: reason,
      });
      setMessage("✅ Gửi yêu cầu hủy đặt phòng thành công.");
      setTimeout(() => navigate("/my-booking"), 2500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Lỗi gửi yêu cầu hủy.");
    }
  };

  return (
    <div className="request-container">
      <h2>Yêu cầu hủy đặt phòng</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Lý do hủy:
          <textarea
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Nhập lý do hủy (tùy chọn)"
          />
        </label>
        <button type="submit" className="btn-submit">Gửi yêu cầu hủy</button>
      </form>
      {message && <p className="request-message">{message}</p>}
    </div>
  );
}

export default BookingCancelRequest;
