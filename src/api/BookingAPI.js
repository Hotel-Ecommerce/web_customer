// src/api/BookingAPI.js
import api from './axiosInstance';

export const getBookingsByCustomer = async () => {
  const res = await api.get(`/bookings/list`);
  return res.data;
};

export const getBookingById = async (id) => {
  const res = await api.get(`/bookings/${id}`);
  return res.data;
};

export const addBooking = async (bookingData) => {
  const res = await api.post(`/bookings/add`, bookingData); 
  return res.data;
};

export const markBookingPaid = async (bookingId) => {
  const res = await api.put(`/bookings/markBookingPaid/${bookingId}`);
  return res.data;
};
