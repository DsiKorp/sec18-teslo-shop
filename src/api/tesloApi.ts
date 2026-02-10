import axios from "axios";

const tesloApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Interceptors
// use (middleware): Function that executes every time this request is processed 
tesloApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { tesloApi };