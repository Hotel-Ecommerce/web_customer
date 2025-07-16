import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import RoomCard from "../components/RoomCard";
import { getAllRooms, getAvailableRooms } from "../api/RoomAPI";

function Home() {
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    guests: "",
    checkIn: "",
    checkOut: "",
  });
  const [loading, setLoading] = useState(true);

  // Load tất cả phòng khi trang mở lần đầu
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const data = await getAllRooms();
        setRooms(data);
      } catch (err) {
        console.error("Lỗi lấy danh sách phòng:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  // Bấm Search
  const handleSearch = async () => {
    const { checkIn, checkOut, type, guests } = filters;

    if (!checkIn || !checkOut) {
      // Nếu chưa chọn ngày → chỉ lọc local
      const filtered = rooms.filter((room) => {
        const matchType = type ? room.type === type : true;
        const matchGuests = guests
          ? room.capacity >= parseInt(guests)
          : true;
        return matchType && matchGuests;
      });
      setRooms(filtered);
    } else {
      // Nếu có ngày → gọi API thật
      setLoading(true);
      try {
        const data = await getAvailableRooms({ type, guests, checkIn, checkOut });
        setRooms(data);
      } catch (err) {
        console.error("Lỗi gọi /rooms/available:", err);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <SearchBox filters={filters} setFilters={setFilters} onSearch={handleSearch} />

      <div style={styles.roomList}>
        {loading ? (
          <p>Đang tải phòng...</p>
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
