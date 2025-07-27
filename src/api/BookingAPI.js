// src/api/BookingAPI.js
import api from './axiosInstance';

// Lấy danh sách các booking của khách hàng hiện tại
export const getBookingsByCustomer = async () => {
  const res = await api.get(`/bookings/list`);
  return res.data;
};

// Lấy thông tin một booking theo ID
export const getBookingById = async (id) => {
  const res = await api.get(`/bookings/${id}`);
  return res.data;
};

// Tạo một booking mới
export const addBooking = async (bookingData) => {
  const res = await api.post(`/bookings/add`, bookingData); 
  return res.data;
};

// Đánh dấu đã thanh toán (online)
export const markBookingPaid = async (bookingId) => {
  const res = await api.put(`/bookings/markBookingPaid/${bookingId}`);
  return res.data;
};

// XÓA booking 
export const deleteBooking = async (bookingId) => {
  const res = await api.delete(`/bookings/${bookingId}`);
  return res.data;
};