import api from './axiosInstance';

export const requestBookingChange = async (data) => {
  const res = await api.post('/bookings/bookingChangeRequests/update', data);
  return res.data;
};