import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from './components/LoginPage.jsx';
import MainPage from './components/MainPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import AuthProvider from './contexts/auth-context.jsx';
import store from './slices/store.js';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
