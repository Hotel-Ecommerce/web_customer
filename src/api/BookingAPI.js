import axios from 'axios';

const API_URL = 'http://localhost:7079';

export const getBookingsByCustomer = async (customerId) => {
  const res = await axios.get(`${API_URL}/bookings/list`, {
    params: { customerId },
  });
  return res.data;
};

export const getBookingById = async (id) => {
  const res = await axios.get(`${API_URL}/bookings/${id}`);
  return res.data;
};

export const addBooking = async (bookingData) => {
  const res = await axios.post(`${API_URL}/bookings/add`, bookingData);
  return res.data;
};
