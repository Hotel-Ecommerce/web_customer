import api from './axiosInstance';

export const requestBookingChange = async (data) => {
  const res = await api.post('/bookings/bookingChangeRequests/update', data);
  return res.data;
};

export const requestBookingCancellation = async (data) => {
  const res = await api.post('/bookings/bookingChangeRequests/cancel', data);
  return res.data;
};