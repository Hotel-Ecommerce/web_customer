import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { markBookingPaid, getBookingById } from "../api/BookingAPI";
import "./PaymentPage.css";

function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookingById(bookingId);
        setBooking(data);
      } catch (error) {
        setMessage("Không tìm thấy thông tin đặt phòng.");
        setMessageColor("red");
      }
    };
    fetchData();
  }, [bookingId]);

  const handlePayment = async (method) => {
    setIsPaying(true);
    try {
      if (method === "online") {
        await markBookingPaid(bookingId);
        setMessage("🔓 Thanh toán thành công!");
        setMessageColor("green");
      } else {
        setMessage("🕓 Đặt phòng thành công! Thanh toán khi nhận phòng");
        setMessageColor("#1e88e5"); // Màu xanh dương
      }

      // ⏳ Sau 3 giây chuyển sang trang lịch sử đặt phòng
      setTimeout(() => {
        navigate("/my-booking");
      }, 3000);
    } catch (error) {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
      setMessageColor("red");
    } finally {
      setIsPaying(false);
    }
  };

  if (!booking) return <p>Đang tải thông tin đặt phòng...</p>;

  return (
    <div className="payment-page">
      <h2>Thanh toán đặt phòng</h2>

      <div className="booking-summary">
        <p><strong>Phòng:</strong> {booking.roomId?.roomNumber}</p>
        <p><strong>Loại:</strong> {booking.roomId?.type}</p>
        <p><strong>Ngày nhận:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
        <p><strong>Ngày trả:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
        <p><strong>Tổng tiền:</strong> {booking.totalPrice?.toLocaleString()} đ</p>
      </div>

      <div className="payment-options">
        <button
          className="offline-btn"
          onClick={() => handlePayment("offline")}
          disabled={isPaying}
        >
          Thanh toán khi nhận phòng
        </button>
        <button
          className="online-btn"
          onClick={() => handlePayment("online")}
          disabled={isPaying}
        >
          Thanh toán online
        </button>
      </div>

      {message && <p className="result-message" style={{ color: messageColor }}>{message}</p>}
    </div>
  );
}

export default PaymentPage;

