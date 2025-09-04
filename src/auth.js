import { jwtDecode } from 'jwt-decode';

export const getUserRole = () => {
  const token = sessionStorage.getItem('authToken');
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded?.role;
};

export const isAuthenticated = () => !!sessionStorage.getItem('authToken');
