import axios from 'axios';

const API_URL = 'http://localhost:7079';

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

export const signup = async (signupData) => {
  const res = await axios.post(`${API_URL}/signup`, signupData);
  return res.data;
};
