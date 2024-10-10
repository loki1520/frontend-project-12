import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import MainPage from './components/MainPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import AuthProvider from './contexts/auth-context.jsx';
import useAuth from './hooks/index.jsx';

const PrivateRoute = ({ children }) => {
  const { isAuthorized, location } = useAuth();

  return (
    isAuthorized ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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

export default App;
