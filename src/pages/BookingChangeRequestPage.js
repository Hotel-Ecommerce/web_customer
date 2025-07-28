import React, { useEffect, useState } from "react";
import { getBookingsByCustomer } from "../api/BookingAPI";
import { requestBookingChange, requestBookingCancellation } from "../api/BookingChangeRequestAPI";
import { format } from "date-fns";
import '../css/BookingChangeRequestPage.css';

function BookingChangeRequestPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [changeData, setChangeData] = useState({
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookingsByCustomer();
        setBookings(data);
      } catch (err) {
        alert("Lỗi khi tải danh sách đặt phòng");
      }
    };
    fetchBookings();
  }, []);

  const handleChangeBooking = async (e) => {
    e.preventDefault();
    try {
      await requestBookingChange({
        bookingId: selectedBookingId,
        requestedRoomId: changeData.roomId,
        requestedCheckInDate: changeData.checkInDate,
        requestedCheckOutDate: changeData.checkOutDate,
      });
      alert("Gửi yêu cầu thay đổi thành công");
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi gửi yêu cầu");
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await requestBookingCancellation({ bookingId: id, cancellationReason: cancelReason });
      alert("Gửi yêu cầu hủy thành công");
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi gửi yêu cầu hủy");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Yêu cầu thay đổi / hủy đặt phòng</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Phòng</th>
            <th>Ngày nhận</th>
            <th>Ngày trả</th>
            <th>Thay đổi</th>
            <th>Hủy</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.roomId?.roomNumber}</td>
              <td>{format(new Date(b.checkInDate), "dd/MM/yyyy")}</td>
              <td>{format(new Date(b.checkOutDate), "dd/MM/yyyy")}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => setSelectedBookingId(b._id)}>
                  Yêu cầu thay đổi
                </button>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Lý do hủy"
                  className="form-control mb-2"
                  onChange={(e) => setCancelReason(e.target.value)}
                />
                <button className="btn btn-danger btn-sm" onClick={() => handleCancelBooking(b._id)}>
                  Yêu cầu hủy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBookingId && (
        <div className="card p-3 mt-4">
          <h5>Yêu cầu thay đổi booking</h5>
          <form onSubmit={handleChangeBooking}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Room ID mới"
              value={changeData.roomId}
              onChange={(e) => setChangeData({ ...changeData, roomId: e.target.value })}
              required
            />
            <input
              type="date"
              className="form-control mb-2"
              value={changeData.checkInDate}
              onChange={(e) => setChangeData({ ...changeData, checkInDate: e.target.value })}
              required
            />
            <input
              type="date"
              className="form-control mb-2"
              value={changeData.checkOutDate}
              onChange={(e) => setChangeData({ ...changeData, checkOutDate: e.target.value })}
              required
            />
            <button className="btn btn-success" type="submit">
              Gửi yêu cầu thay đổi
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookingChangeRequestPage;
