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

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingBooking, setPendingBooking] = useState(null);

  const [showConflictModal, setShowConflictModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); 

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

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("vi-VN");
  };

  const handleBooking = () => {
    const customerId = localStorage.getItem("customerId");

    if (!customerId) {
      setShowLoginModal(true);
      return;
    }

    if (!checkIn || !checkOut) {
      setErrorMessage("Vui lòng chọn ngày nhận và trả phòng.");
      setShowErrorModal(true);
      return;
    }

    setPendingBooking({
      customerId,
      roomId: id,
      checkInDate: checkIn,
      checkOutDate: checkOut,
    });
    setShowConfirmModal(true);
  };

  const confirmBooking = async () => {
    try {
      await addBooking(pendingBooking);
      setShowConfirmModal(false);
      setShowSuccessModal(true); 
    } catch (err) {
      setShowConfirmModal(false);
      const message = err.response?.data?.message;

      if (message?.includes("Phòng không có sẵn")) {
        setShowConflictModal(true);
      } else if (message?.includes("ngày không hợp lệ")) {
        setErrorMessage("Ngày nhận và trả không hợp lệ.");
        setShowErrorModal(true);
      } else {
        setErrorMessage(message || "Lỗi đặt phòng.");
        setShowErrorModal(true);
      }
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

      {/* Modal lỗi chung */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Không thể đặt phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal xác nhận đặt phòng */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đặt phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn xác nhận đặt phòng từ <strong>{formatDate(checkIn)}</strong> đến{" "}
          <strong>{formatDate(checkOut)}</strong> với tổng tiền{" "}
          <strong>{total.toLocaleString()} đ</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={confirmBooking}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal khi phòng trùng lịch */}
      <Modal show={showConflictModal} onHide={() => setShowConflictModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Phòng không còn trống</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Phòng đã được đặt trong khoảng thời gian bạn chọn. Vui lòng chọn ngày khác.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowConflictModal(false);
              navigate(`/room/${id}?checkIn=${checkIn}&checkOut=${checkOut}`);
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ✅ Modal thông báo thành công */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đặt phòng thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn đã đặt phòng thành công từ <strong>{formatDate(checkIn)}</strong> đến{" "}
          <strong>{formatDate(checkOut)}</strong>.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowSuccessModal(false);
              navigate("/my-booking");
            }}
          >
            Xem lịch sử đặt phòng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal yêu cầu đăng nhập */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Yêu cầu đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn cần đăng nhập để tiếp tục đặt phòng. Bạn có muốn chuyển đến trang đăng nhập không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const currentPath = `/room/${id}?checkIn=${checkIn}&checkOut=${checkOut}`;
              navigate(`/login?redirect=${encodeURIComponent(currentPath)}`);
            }}
          >
            Đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RoomDetail;


