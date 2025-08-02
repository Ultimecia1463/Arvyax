import axios from 'axios';

export const API_BASE = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, 
});

const getToken = () => JSON.parse(sessionStorage.getItem('user'))?.token;

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let msg = 'Request failed';

    if (error.response) {
      const data = error.response.data;
      msg = data.error || data.message || `HTTP ${error.response.status}`;
    } else if (error.request) {
      msg = 'No response from server';
    } else {
      msg = error.message;
    }

    return Promise.reject(new Error(msg));
  }
);

export default api;
