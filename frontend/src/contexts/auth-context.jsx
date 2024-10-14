import { useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './index.jsx';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const location = useLocation();

  const navigate = useNavigate();

  const logIn = (userData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('userData');
    navigate('/login', { state: { from: location } });
  }, [setUser, navigate, location]);

  const value = useMemo(() => ({
    user,
    location,
    navigate,
    logIn,
    logOut,
  }), [user, location, navigate, logOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
