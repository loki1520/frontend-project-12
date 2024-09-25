import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageNotFound from './components/PageNotFound';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';

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
