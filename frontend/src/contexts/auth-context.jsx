import {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './index.jsx';

const AuthProvider = ({ children }) => {
  // console.count();
  const [user, setUser] = useState(null);

  const location = useLocation();

  const navigate = useNavigate();

  const logOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('userData');
    navigate('/login', { state: { from: location } });
  }, [navigate, location]);

  const value = useMemo(() => ({
    user,
    setUser,
    location,
    navigate,
    logOut,
  }), [user, location, navigate, logOut]);

  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    if (userData && !user) {
      setUser(userData);
    }
  }, [user, userData]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
