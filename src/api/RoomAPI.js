import axios from 'axios';

const API_URL = 'http://localhost:7079';

export const getAllRooms = async () => {
  const res = await axios.get(`${API_URL}/rooms/list`);
  return res.data;
};

export const getRoomById = async (id) => {
  const res = await axios.get(`${API_URL}/rooms/${id}`);
  return res.data;
};

export const getAvailableRooms = async (params) => {
  const res = await axios.get(`${API_URL}/rooms/available`, { params });
  return res.data;
};