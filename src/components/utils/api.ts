import axios from "axios";
import { userStore } from "@/stores/userStore";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});


api.interceptors.request.use((config => {
  const authData = JSON.parse(localStorage.getItem('user') || '{}');
  const token = authData?.token || null;
  
  if (token && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}));


export default api;