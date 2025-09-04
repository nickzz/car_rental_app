import axios from 'axios';

const instance = axios.create({
//   baseURL: 'https://car-rental-wr0b.onrender.com',
  baseURL: 'http://localhost:5052',

});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
