import api from './axiosInstance';

export const getAllRooms = async () => {
  const res = await api.get(`/rooms/list`);
  return res.data;
};

export const getRoomById = async (id) => {
  const res = await api.get(`/rooms/${id}`);
  return res.data;
};

export const getAvailableRooms = async ({ checkIn, checkOut, type, guests }) => {
  const res = await api.get('/rooms/list/available', {
    params: {
      checkInDate: checkIn,
      checkOutDate: checkOut,
      type,
      capacity: guests ? parseInt(guests) : undefined
    }
  });
  return res.data;
};