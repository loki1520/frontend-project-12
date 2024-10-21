import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from './pages/LoginPage.jsx';
import MainPage from './pages/MainPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AuthProvider from './contexts/auth-context.jsx';
import useAuth from './hooks/useAuth.jsx';
import store from './slices/store.js';

const PrivateRoute = ({ children }) => {
  const { location } = useAuth();
  const isAuthorized = localStorage.getItem('userData');

  return (
    isAuthorized ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;
