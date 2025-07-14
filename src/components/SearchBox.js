import React from "react";
import "./SearchBox.css";

function SearchBox({ filters, setFilters, onSearch }) {
  return (
    <div className="search-box">
      {/* Ngày nhận */}
      <div className="search-item">
        <label>Ngày nhận</label>
        <input
          type="date"
          value={filters.checkIn}
          onChange={(e) =>
            setFilters({ ...filters, checkIn: e.target.value })
          }
        />
      </div>

      {/* Ngày trả */}
      <div className="search-item">
        <label>Ngày trả</label>
        <input
          type="date"
          value={filters.checkOut}
          onChange={(e) =>
            setFilters({ ...filters, checkOut: e.target.value })
          }
        />
      </div>

      {/* Loại phòng */}
      <div className="search-item">
        <label>Loại phòng</label>
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value=""> Tất cả </option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

      {/* Sức chứa */}
      <div className="search-item">
        <label>Sức chứa</label>
        <select
          value={filters.guests}
          onChange={(e) =>
            setFilters({ ...filters, guests: e.target.value })
          }
        >
          <option value=""> Số khách </option>
          <option value="1">1 khách</option>
          <option value="2">2 khách</option>
          <option value="3">3 khách</option>
          <option value="4">4 khách</option>
        </select>
      </div>

      {/* Nút tìm kiếm */}
      <div className="search-item">
        <label>&nbsp;</label>
        <button onClick={onSearch}>Search</button>
      </div>
    </div>
  );
}

export default SearchBox;


