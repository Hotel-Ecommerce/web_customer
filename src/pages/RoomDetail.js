import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Carousel, Modal, Button } from "react-bootstrap";
import { getRoomById } from "../api/RoomAPI";
import { addBooking } from "../api/BookingAPI";
import "./RoomDetail.css";

function RoomDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const [checkIn, setCheckIn] = useState(query.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(query.get("checkOut") || "");

  const [room, setRoom] = useState(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(id);
        setRoom(data);
      } catch (err) {
        setError("Không thể tải thông tin phòng.");
      }
    };
    fetchRoom();
  }, [id]);

  useEffect(() => {
    if (room && checkIn && checkOut) {
      const dayCount =
        (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
      setTotal(dayCount > 0 ? dayCount * room.price : 0);
    }
  }, [room, checkIn, checkOut]);

  const handleBooking = async () => {
    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      alert("Bạn cần đăng nhập để đặt phòng.");
      navigate("/login");
      return;
    }

    try {
      await addBooking({
        customerId,
        roomId: id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      });

      alert("Đặt phòng thành công!");
      navigate("/my-booking");
    } catch (err) {
      const message = err.response?.data?.message || "Lỗi đặt phòng";
      setErrorMessage(message);
      setShowErrorModal(true);
    }
  };

  if (!room) return <p style={{ padding: "20px" }}>Đang tải thông tin phòng...</p>;

  return (
    <div className="room-detail">
      <Carousel className="room-carousel">
        {room.images?.map((img, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={`http://localhost:7079${img}`}
              alt={`Ảnh ${idx + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <h2>{room.type} Room</h2>
      <p>{room.description}</p>
      <p className="price">{room.price.toLocaleString()} đ / đêm</p>
      <p>Sức chứa: {room.capacity} người</p>

      <div className="date-picker">
        <label>
          Ngày nhận
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>
        <label>
          Ngày trả
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>
      </div>

      <div className="total-price">Tổng tiền: {total.toLocaleString()} đ</div>

      <button onClick={handleBooking}>Đặt phòng</button>
      {error && <div className="error">{error}</div>}

      {/* Modal báo lỗi đặt phòng */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title> Phòng không còn trống trong thời gian này </Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RoomDetail;
