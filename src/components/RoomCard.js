import React from "react";
import { Link } from "react-router-dom";
import './RoomCard.css';

function RoomCard({ room, checkIn, checkOut }) {
  return (
    <div className="room-card">
      <img
        src={room.images[0]}
        alt={room.name}
        className="room-image"
      />
      <div className="room-type">{room.type} Room</div>
      <div className="room-price">{room.price.toLocaleString()} đ / ngày</div>

      <Link
        to={`/room/${room._id}?checkIn=${checkIn}&checkOut=${checkOut}`}
        className="room-button"
        state={{ room }}
      >
        Xem chi tiết
      </Link>
    </div>
  );
}

export default RoomCard;

