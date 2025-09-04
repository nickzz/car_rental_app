// src/services/authService.js
import axios from 'axios';

// const API_BASE = 'https://car-rental-wr0b.onrender.com';
const API_BASE = 'http://localhost:5052/api/users';


export const login = (data) => axios.post(`${API_BASE}/login`, data);
export const register = (data) => axios.post(`${API_BASE}/register`, data);
export const forgotPassword = (data) => axios.post(`${API_BASE}/forgot-password`, data);
