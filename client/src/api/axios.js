import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Important for cookies
});

// Optionally, you could add interceptors here to handle global errors (e.g., 401 redirects)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Return a structured error response
    if (error.response && error.response.data && error.response.data.message) {
      return Promise.reject(new Error(error.response.data.message));
    }
    return Promise.reject(error);
  }
);

export default api;
