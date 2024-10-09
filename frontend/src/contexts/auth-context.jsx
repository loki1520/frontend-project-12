import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './index.jsx';

const AuthProvider = ({ children }) => {
  const [isAuthorized, setAuthorised] = useState(false);
  const logIn = () => setAuthorised(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setAuthorised(false);
  };
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AuthContext.Provider value={{
      isAuthorized,
      logIn,
      logOut,
      location,
      navigate,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
