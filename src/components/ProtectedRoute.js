import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../auth';

const ProtectedRoute = ({ children, role }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;
  if (role && getUserRole() !== role) return <Navigate to="/dashboard" />;
  return children;
};

export default ProtectedRoute;
