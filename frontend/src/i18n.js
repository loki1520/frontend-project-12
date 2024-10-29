import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

i18next
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'ru',
    resources,
    interpolation: {
      escapeValue: false, // экранирование уже есть в самом React
    },
  });

export default i18next;
