import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Carousel, Modal, Button } from "react-bootstrap";
import { getRoomById } from "../api/RoomAPI";
import { addBooking } from "../api/BookingAPI";
import "../css/RoomDetail.css";

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

  // ✅ Ràng buộc: nếu checkIn > checkOut thì xóa checkOut
  useEffect(() => {
    if (checkIn && checkOut && new Date(checkIn) > new Date(checkOut)) {
      setCheckOut("");
    }
  }, [checkIn, checkOut]);

  // ✅ Ràng buộc: nếu checkOut < checkIn thì xóa checkIn
  useEffect(() => {
    if (checkIn && checkOut && new Date(checkOut) < new Date(checkIn)) {
      setCheckIn("");
    }
  }, [checkIn, checkOut]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("vi-VN");
  };

  const handleBooking = () => {
    const customerId = localStorage.getItem("customerId");
    const today = new Date().toISOString().split("T")[0];

    if (!customerId) {
      setShowLoginModal(true);
      return;
    }

    if (!checkIn || !checkOut) {
      setErrorMessage("Vui lòng chọn ngày nhận và trả phòng.");
      setShowErrorModal(true);
      return;
    }

    if (checkIn < today) {
      setErrorMessage("Ngày nhận phòng không được trong quá khứ.");
      setShowErrorModal(true);
      return;
    }

    if (checkOut <= checkIn) {
      setErrorMessage("Ngày trả phòng phải sau ngày nhận phòng.");
      setShowErrorModal(true);
      return;
    }

    setPendingBooking({
      customerId,
      roomId: id,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice: total,
    });
    setShowConfirmModal(true);
  };

  const confirmBooking = async () => {
    try {
      const res = await addBooking(pendingBooking);
      setShowConfirmModal(false);
      navigate(`/payment/${res._id}`);
    } catch (err) {
      setShowConfirmModal(false);
      const message = err.response?.data?.message;
      if (message?.includes("Phòng không có sẵn")) {
        setShowConflictModal(true);
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
              src={`https://hotel-api.phuongtran.site${img}`}
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
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>
        <label>
          Ngày trả
          <input
            type="date"
            value={checkOut}
            min={checkIn || new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>
      </div>

      <div className="total-price">Tổng tiền: {total.toLocaleString()} đ</div>

      <button onClick={handleBooking}>Đặt phòng</button>
      {error && <div className="error">{error}</div>}

      {/* Modal lỗi */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Lỗi đặt phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal xác nhận */}
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

      {/* Modal phòng trùng lịch */}
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

      {/* Modal yêu cầu đăng nhập */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Yêu cầu đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn cần đăng nhập để đặt phòng. Chuyển đến trang đăng nhập?
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
