// src/services/authService.js
import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_API_BASE}/users`

export const login = (data) => axios.post(`${API_BASE}/login`, data);
export const register = (data) => axios.post(`${API_BASE}/register`, data);
export const forgotPassword = (data) => axios.post(`${API_BASE}/forgot-password`, data);
