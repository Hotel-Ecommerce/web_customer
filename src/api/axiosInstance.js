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

export default api;

