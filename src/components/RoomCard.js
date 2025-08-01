import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoomCard.css";

function RoomCard({ room, checkIn, checkOut }) {
  const navigate = useNavigate();

  const handleClick = () => {
    let url = `/room/${room._id}`;
    if (checkIn && checkOut) {
      url += `?checkIn=${checkIn}&checkOut=${checkOut}`;
    }
    navigate(url);
  };

  return (
    <div className="room-card" onClick={handleClick}>
      <div className="room-img">
        <img src={`https://hotel-api.phuongtran.site${room.images?.[0]}`} alt={room.type} />
      </div>
      <div className="room-info">
        <h3>{room.type} Room</h3>
        <p>Số phòng: {room.roomNumber}</p>
        <p className="description">{room.description}</p>
        <p>Sức chứa: {room.capacity} khách</p>
        <p className="price">{room.price.toLocaleString()} đ / đêm</p>
        <button>Xem chi tiết</button>
      </div>
    </div>
  );
}

export default RoomCard;

