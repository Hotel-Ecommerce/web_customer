import api from './axiosInstance';

export const getBookingsByCustomer = async (customerId) => {
  const res = await api.get(`/bookings/list`, {
    params: { customerId }
  });
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





