import axios from 'axios';

const base_url= import.meta.env.VITE_BASE_URL;
export const api = axios.create({
  baseURL: base_url,
  withCredentials: true, // enable cookies for authentication
  headers: {
    'Content-Type': 'application/json',
  },
});
