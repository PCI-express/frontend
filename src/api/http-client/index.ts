import axios from 'axios';

export const API_URL = 'http://212.67.8.123:8000/api/';

export const httpClient = axios.create({
    // withCredentials: true,
    baseURL: API_URL,
});

httpClient.interceptors.request.use((config) => {
    const token: string | null = localStorage.getItem('accessToken');
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
})