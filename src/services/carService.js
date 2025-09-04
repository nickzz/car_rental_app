// src/services/authService.js
import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_API_BASE}/cars`

const httpHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export const getCars = () => { 
    return axios.get(`${API_BASE}/getCars`);
};

export const getAvailableCars = (startDate, endDate) => {
  return axios.get(`${API_BASE}/available?startDate=${startDate}&endDate=${endDate}`);
};

export const getEstimatedPrice = (carId, startDate, endDate) => {
  return axios.get(`${API_BASE}/${carId}/estimate?startDate=${startDate}&endDate=${endDate}`);
};

export const addCars = (data) => {
  return axios.post(`${API_BASE}/addCar`, data, httpHeader);
};

export const updateCar = (id, carData) => {
  return axios.put(`${API_BASE}/UpdateCar/${id}`, carData, httpHeader);
};

export const deleteCar = (id) => {
  return axios.delete(`${API_BASE}/RemoveCar/${id}`, httpHeader);
};

