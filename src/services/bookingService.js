// src/services/authService.js
import axios from 'axios';

// const API_BASE = 'https://car-rental-wr0b.onrender.com';
const API_BASE = 'http://localhost:5052/api/bookings';

const httpHeader = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
    }
}

export const getPendingApplications = () => { axios.get(`${API_BASE}/pending`)};

export const getAllApplications = () => {
  return axios.get(`${API_BASE}/my`, httpHeader);
};
export const submitRental = (data) => {
  return axios.post(`${API_BASE}`, data, httpHeader);
};
export const approve = (id) => {
  return axios.put(`${API_BASE}/${id}/approve`, httpHeader);
};
export const reject = (id) => {
  return axios.put(`${API_BASE}/${id}/reject`, httpHeader);
};
export const sendMessage = (id, data) => {
  return axios.post(`${API_BASE}/${id}/message`, data, httpHeader);
};

