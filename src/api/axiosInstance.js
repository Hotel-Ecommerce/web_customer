import axios from 'axios';
let baseUrl = 'http://localhost:7079';

if (process.env.NODE_ENV === 'production') {
  baseUrl = "https://hotel-api.phuongtran.site"
}

const api = axios.create({
  baseURL: baseUrl,
});

// Thêm interceptor để gắn token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Thêm interceptor để xử lý refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${baseUrl}/auth/refreshToken`, {
            refreshToken: refreshToken
          });

          const { token } = response.data;
          localStorage.setItem('token', token);

          // Thử lại request ban đầu với token mới
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Nếu refresh token cũng hết hạn, logout user
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('customerId');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

