import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageNotFound from './Components/PageNotFound';
import MainPage from './Components/MainPage';
import LoginPage from './Components/LoginPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
