import axios from 'axios';

const API_BASE_URL = 'https://localhost:7117/api'; // Updated to match the correct API URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth token here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
