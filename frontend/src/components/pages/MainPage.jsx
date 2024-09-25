import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = false;

    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Тест: Авторизован</h1>
    </div>
  );
};

export default MainPage;
