import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import RoomCard from "../components/RoomCard";
import { getAllRooms, getAvailableRooms } from "../api/RoomAPI";

function Home() {
  const [allRooms, setAllRooms] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    guests: "",
    checkIn: "",
    checkOut: "",
  });
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 5;
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const data = await getAllRooms();
        setAllRooms(data);
        setRooms(data);
      } catch (err) {
        console.error("Lỗi lấy danh sách phòng:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleSearch = async () => {
    const { checkIn, checkOut, type, guests } = filters;
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      alert("Ngày nhận phải trước ngày trả phòng.");
      return;
    }

    if (!checkIn || !checkOut) {
      const filtered = allRooms.filter((room) => {
        const matchType = type ? room.type === type : true;
        const matchGuests = guests ? room.capacity >= parseInt(guests) : true;
        return matchType && matchGuests;
      });
      setRooms(filtered);
      setCurrentPage(1); // reset page
    } else {
      setLoading(true);
      try {
        const data = await getAvailableRooms({ checkIn, checkOut });
        const filtered = data.filter((room) => {
          const matchType = type ? room.type === type : true;
          const matchGuests = guests ? room.capacity >= parseInt(guests) : true;
          return matchType && matchGuests;
        });
        setRooms(filtered);
        setCurrentPage(1);
      } catch (err) {
        console.error("Lỗi gọi API /rooms/list/available:", err);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <div style={{ marginTop: 20 }}>
        <SearchBox
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
        />
      </div>

      <div style={styles.roomList}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <p>Đang tải phòng...</p>
          </div>
        ) : currentRooms.length > 0 ? (
          currentRooms.map((room) => (
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

      {/* PHÂN TRANG */}
      {!loading && rooms.length > 0 && (
        <div style={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            &lt; Trước
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Tiếp &gt;
          </button>
        </div>
      )}
    </>
  );
}

const styles = {
  roomList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    alignItems: "center",
    maxWidth: "100%",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    paddingBottom: "30px",
  },
};

export default Home;
