import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import initSocket from './socketInit.js';
import LoginPage from './pages/LoginPage.jsx';
import MainPage from './pages/MainPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AuthProvider from './contexts/auth-context.jsx';
import useAuth from './hooks/useAuth.js';

const PrivateRoute = ({ children }) => {
  const { location } = useAuth();
  const isAuthorized = localStorage.getItem('userData');

  return (
    isAuthorized ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    // throw new Error('Тестовая ошибка в App для rollbar');
    // rollbaa;
    const cleanSocket = initSocket(dispatch, t);
    return () => cleanSocket();
  }, [dispatch, t]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
