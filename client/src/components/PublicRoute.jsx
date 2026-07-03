import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Loader from './Loader';

// Redirects logged-in users away from /login and /signup
const PublicRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
