import { useTranslation } from 'react-i18next';
import loginImg from '../assets/404-error.png';
import Header from '../components/Header.jsx';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="text-center">
          <img
            alt="loginImg"
            className="w-25 img-fluid"
            src={loginImg}
          />
          <h1 className="h4 text-muted">{t('notFound.title')}</h1>
          <p className="text-muted">
            <span>{t('notFound.footerPart1')}</span>
            <a href="/">{t('notFound.footerPart2')}</a>
          </p>
        </div>
      </div>
      <div className="Toastify" />
    </div>
  );
};

export default NotFoundPage;
