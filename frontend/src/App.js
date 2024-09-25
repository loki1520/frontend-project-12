import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageNotFound from './components/pages/notFoundPage';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
