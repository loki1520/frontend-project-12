import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';

const Header = () => {
  const { t } = useTranslation();

  const { user, logOut } = useAuth();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t('header.namePage')}
        </a>
        {user && (
          <button type="button" className="btn btn-primary" onClick={logOut}>
            {t('header.exit')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
