import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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

  const mockRooms = [
    {
      _id: "r001",
      type: "Standard",
      price: 500000,
      capacity: 2,
      description: "Phòng tiêu chuẩn cho 2 người.",
      images: ["https://source.unsplash.com/600x400/?hotel,standard"],
      bookedDates: [
        { checkIn: "2025-07-10", checkOut: "2025-07-13" },
        { checkIn: "2025-07-18", checkOut: "2025-07-20" },
      ],
    },
    {
      _id: "r002",
      type: "Deluxe",
      price: 800000,
      capacity: 3,
      description: "Phòng Deluxe cao cấp, có ban công.",
      images: ["https://source.unsplash.com/600x400/?hotel,deluxe"],
      bookedDates: [],
    },
    {
      _id: "r003",
      type: "Suite",
      price: 1200000,
      capacity: 4,
      description: "Phòng Suite sang trọng, nhiều tiện nghi.",
      images: ["https://source.unsplash.com/600x400/?hotel,suite"],
      bookedDates: [{ checkIn: "2025-07-15", checkOut: "2025-07-18" }],
    },
  ];

  useEffect(() => {
    const roomFound = mockRooms.find((r) => r._id === id);
    if (roomFound) {
      setRoom(roomFound);
    } else {
      setError("Không tìm thấy phòng");
    }
  }, [id]);

  useEffect(() => {
    if (room && checkIn && checkOut) {
      const days =
        (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
      setTotal(days > 0 ? days * room.price : 0);
    }
  }, [room, checkIn, checkOut]);

  const isDateOverlap = () => {
    if (!room || !room.bookedDates || !checkIn || !checkOut) return false;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    return room.bookedDates.some((b) => {
      const bookedStart = new Date(b.checkIn);
      const bookedEnd = new Date(b.checkOut);
      return start < bookedEnd && end > bookedStart;
    });
  };

  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để đặt phòng.");
      navigate("/login");
      return;
    }

    if (isDateOverlap()) {
      setError("Phòng này đã được đặt trong khoảng thời gian bạn chọn.");
      return;
    }

    alert("Đặt phòng thành công! (giả lập)");
    navigate("/my-booking");
  };

  if (!room) return <p style={{ padding: "20px" }}>Đang tải thông tin phòng...</p>;

  return (
    <div className="room-detail">
      <img src={room.images?.[0]} alt={room.type} />
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

      {isDateOverlap() && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Phòng đã có người đặt trong khoảng ngày này.
        </p>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default RoomDetail;


/*import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "../services/api";
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

  // ✅ Gọi API để lấy thông tin phòng
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        setError("Không thể tải thông tin phòng.");
      }
    };
    fetchRoom();
  }, [id]);

  // ✅ Tính tổng tiền
  useEffect(() => {
    if (room && checkIn && checkOut) {
      const days =
        (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
      setTotal(days > 0 ? days * room.price : 0);
    }
  }, [room, checkIn, checkOut]);

  // ✅ Gửi booking nếu đã đăng nhập
  const handleBooking = async () => {
    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      alert("Bạn cần đăng nhập để đặt phòng.");
      navigate("/login");
      return;
    }

    try {
      await axios.post("/bookings/add", {
        customerId,
        roomId: id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      });

      alert("Đặt phòng thành công!");
      navigate("/my-booking");
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi đặt phòng");
    }
  };

  if (!room) return <p style={{ padding: "20px" }}>Đang tải thông tin phòng...</p>;

  return (
    <div className="room-detail">
      <img src={room.images?.[0]} alt={room.name} />
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
    </div>
  );
}

export default RoomDetail;

*/
