import jwtDecode from 'jwt-decode';

export const getUserRole = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded?.role;
};

export const isAuthenticated = () => !!localStorage.getItem('authToken');
