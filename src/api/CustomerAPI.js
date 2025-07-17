import api from './axiosInstance';

// Lấy thông tin khách hàng theo ID
export const getCustomerById = async (id) => {
  const res = await api.get(`/customers/${id}`);
  return res.data;
};

// Cập nhật thông tin khách hàng
export const updateCustomer = async (customerData) => {
  const res = await api.post(`/customers/update`, customerData);
  return res.data;
};

// Đổi mật khẩu khách hàng
export const changePassword = async ({ customerId, oldPassword, newPassword }) => {
  const res = await api.post(`/auth/changePassword`, {
    customerId,
    oldPassword,
    newPassword,
  });
  return res.data;
};

