import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LogLocation = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Location changed:', location);
  }, [location]);

  return null; // Этот компонент не рендерит ничего на экран, он только логирует.
};

export default LogLocation;
