/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Loading from '../components/Loading/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loading />;
  if (user) return children;

  return <Navigate to="/Account/signin" state={{ from: location }} />;
};

export default PrivateRoute;
