import api from './axiosInstance';

export const login = async (email, password) => {
  const res = await api.post(`/auth/login`, { email, password });
  return res.data;
};

export const signup = async (signupData) => {
  const res = await api.post(`/auth/signup`, signupData);
  return res.data;
};

export const signout = async () => {
  const res = await api.post(`/auth/signout`);
  return res.data;
};

