// services/api.ts
import axios from 'axios';

const horroscopeBackend = axios.create({
  // TODO change this to be based on ENV variable
  baseURL: 'http://localhost:8000', // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// Add Authorization header from localStorage on each request
horroscopeBackend.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default horroscopeBackend;
