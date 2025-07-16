import axios from 'axios';

const API_URL = 'http://localhost:7079';

export const getCustomerById = async (id) => {
  const res = await axios.get(`${API_URL}/customers/${id}`);
  return res.data;
};

export const updateCustomer = async (customerData) => {
  const res = await axios.post(`${API_URL}/customers/update`, customerData);
  return res.data;
};

export const changePassword = async ({ customerId, oldPassword, newPassword }) => {
  const res = await axios.post(`${API_URL}/customer/change-password`, {
    customerId,
    oldPassword,
    newPassword,
  });
  return res.data;
};