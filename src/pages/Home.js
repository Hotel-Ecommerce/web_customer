import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import RoomCard from "../components/RoomCard";

function Home() {
  const [filters, setFilters] = useState({
    type: "",
    guests: "",
    checkIn: "",
    checkOut: "",
  });

  const [rooms, setRooms] = useState([]);

  // Dữ liệu giả định: danh sách phòng và các ngày đã đặt
  const allRooms = [
    {
      _id: "r001",
      type: "Standard",
      price: 500000,
      capacity: 2,
      description: "Phòng tiêu chuẩn cho 2 người.",
      images: ["https://source.unsplash.com/300x200/?hotel,standard"],
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
      images: ["https://source.unsplash.com/300x200/?hotel,deluxe"],
      bookedDates: [],
    },
    {
      _id: "r003",
      type: "Suite",
      price: 1200000,
      capacity: 4,
      description: "Phòng Suite sang trọng, nhiều tiện nghi.",
      images: ["https://source.unsplash.com/300x200/?hotel,suite"],
      bookedDates: [{ checkIn: "2025-07-15", checkOut: "2025-07-18" }],
    },
  ];

  // Kiểm tra nếu bị trùng với khoảng thời gian đã đặt
  const isRoomAvailable = (room, checkIn, checkOut) => {
    if (!checkIn || !checkOut) return true;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    return !room.bookedDates.some((b) => {
      const bStart = new Date(b.checkIn);
      const bEnd = new Date(b.checkOut);
      return start < bEnd && end > bStart;
    });
  };

  const fetchRooms = () => {
    const filtered = allRooms.filter((room) => {
      const matchType = filters.type ? room.type === filters.type : true;
      const matchGuests = filters.guests
        ? room.capacity >= parseInt(filters.guests)
        : true;
      const matchAvailable = isRoomAvailable(
        room,
        filters.checkIn,
        filters.checkOut
      );
      return matchType && matchGuests && matchAvailable;
    });

    setRooms(filtered);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      <SearchBox
        filters={filters}
        setFilters={setFilters}
        onSearch={fetchRooms}
      />

      <div style={styles.roomList}>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              checkIn={filters.checkIn}
              checkOut={filters.checkOut}
            />
          ))
        ) : (
          <p style={{ padding: "20px" }}>Không có phòng phù hợp.</p>
        )}
      </div>
    </>
  );
}

const styles = {
  roomList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    justifyContent: "flex-start",
  },
};

export default Home;



/*import React, { useState, useEffect } from "react";
import axios from "../services/api";
import SearchBox from "../components/SearchBox";
import RoomCard from "../components/RoomCard";

function Home() {
  const [filters, setFilters] = useState({
    type: "",
    guests: "",
    checkIn: "",
    checkOut: "",
  });

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API thật để lấy danh sách phòng còn trống
  const fetchRooms = async (currentFilters = filters) => {
    setLoading(true);
    try {
      const res = await axios.get("/rooms/available", {
        params: {
          type: currentFilters.type,
          guests: currentFilters.guests,
          checkIn: currentFilters.checkIn,
          checkOut: currentFilters.checkOut,
        },
      });

      setRooms(res.data);
    } catch (err) {
      console.error("Lỗi khi gọi API /rooms/available:", err);
      setRooms([]); // fallback rỗng nếu lỗi
    } finally {
      setLoading(false);
    }
  };

  // Tự động fetch khi trang load
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      <SearchBox
        filters={filters}
        setFilters={setFilters}
        onSearch={() => fetchRooms(filters)}
      />

      <div style={styles.roomList}>
        {loading ? (
          <p>Đang tải danh sách phòng...</p>
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              checkIn={filters.checkIn}
              checkOut={filters.checkOut}
            />
          ))
        ) : (
          <p>Không có phòng phù hợp.</p>
        )}
      </div>
    </>
  );
}

const styles = {
  roomList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    justifyContent: "flex-start",
  },
};

export default Home;

*/

